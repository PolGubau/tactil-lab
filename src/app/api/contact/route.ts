import { Client as NotionClient } from "@notionhq/client";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Lazy client factory (throws clearly if env vars are missing) ────────────
function getResend() {
	if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
	return new Resend(process.env.RESEND_API_KEY);
}
function getNotion() {
	if (!process.env.NOTION_TOKEN) throw new Error("Missing NOTION_TOKEN");
	return new NotionClient({ auth: process.env.NOTION_TOKEN });
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface ContactPayload {
	name: string;
	email: string;
	phone?: string;
	service?: string;
	message: string;
}

// ─── Notion ──────────────────────────────────────────────────────────────────
async function createNotionEntry(data: ContactPayload): Promise<void> {
	const databaseId = process.env.NOTION_DATABASE_ID;
	if (!databaseId) throw new Error("Missing NOTION_DATABASE_ID");

	const notion = getNotion();
	await notion.pages.create({
		parent: { database_id: databaseId },
		properties: {
			// "Name" must be your database's title property
			Name: { title: [{ text: { content: data.name } }] },
			Email: { email: data.email },
			Phone: { phone_number: data.phone ?? "" },
			// "Service" and "Status" must be Select properties in Notion
			...(data.service && { Service: { select: { name: data.service } } }),
			Status: { select: { name: "New" } },
			Message: { rich_text: [{ text: { content: data.message } }] },
			"Submitted At": { date: { start: new Date().toISOString() } },
		} as never,
	});
}

// ─── Notification email (team) ────────────────────────────────────────────────
async function sendNotificationEmail(data: ContactPayload): Promise<void> {
	const resend = getResend();
	const from = process.env.RESEND_FROM ?? "Tactil <onboarding@resend.dev>";
	const to = process.env.CONTACT_EMAIL ?? "hola@tactil.dev";

	await resend.emails.send({
		from,
		to: [to],
		replyTo: data.email,
		subject: `✉️ Nuevo contacto: ${data.name}`,
		html: notificationHtml(data),
	});
}

// ─── Confirmation email (client) ─────────────────────────────────────────────
async function sendConfirmationEmail(data: ContactPayload): Promise<void> {
	const resend = getResend();
	const from = process.env.RESEND_FROM ?? "Tactil <onboarding@resend.dev>";
	const firstName = data.name.split(" ")[0];

	await resend.emails.send({
		from,
		to: [data.email],
		subject: `Hemos recibido tu mensaje, ${firstName} 👋`,
		html: confirmationHtml(data),
	});
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
	let data: ContactPayload;
	try {
		data = await req.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	if (!data.name || !data.email || !data.message) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 422 },
		);
	}

	// Run all integrations in parallel - partial failure doesn't block response
	const results = await Promise.allSettled([
		createNotionEntry(data),
		sendNotificationEmail(data),
		sendConfirmationEmail(data),
	]);

	const errors = results.flatMap((r, i) =>
		r.status === "rejected"
			? [{ i, reason: String((r as PromiseRejectedResult).reason) }]
			: [],
	);

	if (errors.length === results.length) {
		console.error("[contact] All integrations failed:", errors);
		return NextResponse.json(
			{ error: "Failed to process submission" },
			{ status: 500 },
		);
	}

	if (errors.length > 0) {
		console.warn("[contact] Partial failure:", errors);
	}

	return NextResponse.json({ ok: true });
}

// ─── HTML templates ───────────────────────────────────────────────────────────
function row(label: string, value: string) {
	return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #ede9e2;color:#7a7068;font-size:13px;width:110px;vertical-align:top">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #ede9e2;font-size:14px;color:#1a1714">${value}</td>
  </tr>`;
}

function notificationHtml(d: ContactPayload) {
	return `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:36px 24px;background:#f7f4ef;border-radius:16px">
    <p style="font-size:22px;font-weight:900;margin:0 0 24px;color:#1a1714">Nuevo contacto desde tactil.dev</p>
    <table style="width:100%;border-collapse:collapse">
      ${row("Nombre", d.name)}
      ${row("Email", `<a href="mailto:${d.email}" style="color:#e84500">${d.email}</a>`)}
      ${d.phone ? row("Teléfono", d.phone) : ""}
      ${d.service ? row("Servicio", d.service) : ""}
      ${row("Mensaje", d.message.replace(/\n/g, "<br>"))}
    </table>
    <div style="margin-top:28px">
      <a href="mailto:${d.email}" style="display:inline-block;padding:12px 24px;background:#e84500;color:#fff;border-radius:9999px;font-weight:700;font-size:13px;text-decoration:none">
        Responder a ${d.name.split(" ")[0]}
      </a>
    </div>
  </div>`;
}

function confirmationHtml(d: ContactPayload) {
	const firstName = d.name.split(" ")[0];
	return `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;background:#f7f4ef;border-radius:16px">
    <p style="font-size:32px;font-weight:900;margin:0 0 16px;color:#1a1714;line-height:1.1">Recibido.</p>
    <p style="color:#7a7068;font-size:15px;line-height:1.7;margin:0 0 24px">
      Gracias por escribirnos, <strong style="color:#1a1714">${firstName}</strong>. Hemos recibido tu mensaje y te responderemos en menos de 24 horas.
    </p>
    <div style="padding:20px;background:#c4eb36;border-radius:12px;margin-bottom:32px">
      <p style="color:rgba(26,23,20,0.55);font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 8px">Tu mensaje</p>
      <p style="color:#1a1714;font-size:14px;line-height:1.6;margin:0">${d.message.replace(/\n/g, "<br>")}</p>
    </div>
    <p style="color:#b5afa8;font-size:13px;margin:0">- El equipo de <strong style="color:#1a1714">Tactil</strong></p>
  </div>`;
}

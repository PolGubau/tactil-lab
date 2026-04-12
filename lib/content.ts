export const CONTENT = {
  brand: 'Tactil',
  hero: {
    eyebrow: 'Web Design & Development / Barcelona',
    title: 'Your business can generate more customers.',
    subtitle: 'Fast. Clear. No uncertainty.',
    description: 'Clean design, clear strategy and more clients for your business. Tell us your idea.',
    cta_primary: 'Get in touch',
    cta_secondary: 'See our work',
  },
  marquee: [
    'Custom code', 'No templates', 'Pixel-perfect', 'Ultra-fast loading',
    'SEO optimized', 'Revisions until happy', 'Barcelona based', 'Global reach',
    'Clean code', 'Modern design',
  ],
  features: [
    { number: '01', title: 'Design that moves. Literally.', description: 'Every interaction is intentional. We craft motion that guides attention and elevates your brand beyond static templates.', tag: 'Design', color: '#ff4d00' },
    { number: '02', title: 'Code crafted. Not copied.', description: 'Zero templates. Zero WordPress. Every line of code is written specifically for your business - lean, fast, and scalable.', tag: 'Development', color: '#c8ff00' },
    { number: '03', title: 'Pixel-perfect by default.', description: 'Obsessive attention to detail across every viewport. Your site looks exactly right on every device, always.', tag: 'Quality', color: '#00d4ff' },
    { number: '04', title: 'Just performance, no tricks.', description: 'Real speed from real optimization. Sub-second loads, 100 Lighthouse scores, and infrastructure that scales.', tag: 'Performance', color: '#bf00ff' },
  ],
  stats: [
    { value: 100, suffix: '%', label: 'Custom built' },
    { value: 7, suffix: ' days', label: 'Avg. delivery' },
    { value: 30, suffix: '+', label: 'Days free support' },
    { value: 100, suffix: '', label: 'Lighthouse score' },
  ],
  pricing: [
    {
      id: 'business', oldPrice: '1,499', price: '699', title: 'Business Website',
      description: 'Professional digital presence. Designed to highlight your brand and attract customers.',
      features: ['Ultra-fast loading', 'Up to 5 pages', 'Revisions until you are happy', 'Premium hosting (1st year)', 'Unique design for your brand'],
      cta: 'Start now',
    },
    {
      id: 'landing', isPopular: true, oldPrice: '799', price: '499', title: 'Landing Page',
      description: 'Ready in 7 days. A page focused 100% on getting clients. Ideal for launches.',
      features: ['Optimized to convert', 'All in one powerful page', 'Revisions until it works', 'Hosting included', 'Integrated contact form'],
      cta: 'Start now',
    },
    {
      id: 'custom', title: 'Custom',
      description: 'Online store, booking system, platform - we make it happen.',
      features: ['Online stores that sell', 'Booking and appointment systems', 'Whatever your business needs', 'Integrations with your tools', 'Ongoing support'],
      cta: 'Talk to us',
    },
  ],
  faq: [
    { question: 'What do you do exactly?', answer: 'We build websites from scratch with custom code. No generic templates. Every website is made specifically for your business.' },
    { question: 'How long does it take?', answer: 'A landing page is ready in 5-7 days, a corporate site in 2-3 weeks, and a full online store in 3-4 weeks.' },
    { question: 'Will I own my website?', answer: 'Absolutely. Your project is 100% yours from day one. We deliver all files and access credentials. No lock-in.' },
    { question: 'What does post-launch support include?', answer: 'Every project includes 30 days of free technical support. After that, flexible maintenance plans cover security updates and priority support.' },
    { question: 'Where are you located?', answer: 'Our team is based in Barcelona, but we work with clients throughout Spain and globally. Distance is never an issue.' },
    { question: 'How do you guarantee quality?', answer: 'Each project goes through design, development, testing, and optimization phases using the latest technologies.' },
    { question: 'Do you offer a free consultation?', answer: 'Yes, always. We start with a free consultation where we analyze your goals, audience, and budget - no commitment required.' },
    { question: 'Do you use WordPress or templates?', answer: 'No. We build every website from scratch with custom code. Fast, 100% adapted to your brand.' },
  ],
  contact: {
    title: 'Lets talk about your project',
    subtitle: 'Tell us what you need and we will get back to you in less than 24 hours.',
    email: 'hola@tactil.dev',
    reasons: [
      { title: '24h response', description: 'We respond in less than one business day' },
      { title: 'Free consultation', description: 'First meeting with no commitment' },
      { title: 'Tailored solutions', description: 'Every project is unique - we adapt' },
      { title: 'Quality guaranteed', description: 'Clean code, optimal performance, support' },
    ],
  },
} as const;

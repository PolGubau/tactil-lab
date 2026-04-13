'use client'
import { getFeaturedProjects, getProjectSummary } from '@/lib/projects'
import { useLocale, useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, summary, index }: { project: ReturnType<typeof getFeaturedProjects>[number]; summary: string; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className='project-card opacity-0 group overflow-hidden bg-card rounded-xl border border-soft shadow-sm'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image / Video */}
      <div className='relative aspect-video overflow-hidden bg-tint'>
        {project.video && hovered ? (
          <video src={project.video} autoPlay muted loop playsInline
            className='w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-100' />
        ) : (
          <Image src={project.coverImage} alt={project.title} fill
            className='object-cover scale-105 transition-transform duration-700 group-hover:scale-100'
            sizes='(max-width: 768px) 100vw, 50vw' />
        )}
        <div className='absolute inset-0 bg-accent/10 transition-opacity duration-300' style={{ opacity: hovered ? 1 : 0 }} />
        <span className='absolute top-4 left-4 text-[10px] tracking-widest font-bold rounded-full px-2.5 py-1 text-muted'
          style={{ background: 'rgba(247,244,239,0.88)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className='absolute top-4 right-4 text-[10px] tracking-[0.18em] uppercase font-bold px-2.5 py-1 rounded bg-accent text-ink'>
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className='p-6 md:p-8'>
        <h3 className='text-2xl font-black mb-3'>{project.title}</h3>
        <p className='text-sm leading-relaxed text-muted mb-5'>{summary}</p>
        <div className='flex flex-wrap gap-2'>
          {project.tags.map(tag => (
            <span key={tag} className='text-[10px] tracking-wide uppercase font-semibold px-2.5 py-1 rounded-full border border-soft text-muted'>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const t = useTranslation()
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const projects = getFeaturedProjects()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-header', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
      gsap.fromTo('.project-card', { opacity: 0, y: 80 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [t])

  return (
    <section ref={sectionRef} id='projects' style={{ padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,5rem)', background: 'var(--bg-subtle)' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='projects-header opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14'>
          <div>
            <span className='pill mb-4 block w-fit'>{t.projects_label}</span>
            <h2 className='text-4xl md:text-6xl font-black leading-[0.95] tracking-tight'>{t.projects_headline}</h2>
            <p className='mt-3 text-base text-muted'>{t.projects_subtitle}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} summary={getProjectSummary(project, locale)} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

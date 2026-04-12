'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTranslation, useLocale } from '@/shared/i18n/hooks'
import { getFeaturedProjects, getProjectSummary } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, summary, index }: { project: ReturnType<typeof getFeaturedProjects>[number]; summary: string; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={project.link ?? '#'}
      target={project.link ? '_blank' : undefined}
      rel='noopener noreferrer'
      className='project-card opacity-0 group relative block overflow-hidden transition-all duration-400'
      style={{ background: 'var(--bg-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-sm)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image / Video */}
      <div className='relative aspect-[4/3] overflow-hidden' style={{ background: 'var(--bg-subtle)', borderRadius: 'calc(var(--r-xl) - 1px) calc(var(--r-xl) - 1px) 0 0' }}>
        {project.video && hovered ? (
          <video src={project.video} autoPlay muted loop playsInline className='w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-100' />
        ) : (
          <Image src={project.coverImage} alt={project.title} fill
            className='object-cover scale-105 transition-transform duration-700 group-hover:scale-100'
            sizes='(max-width: 768px) 100vw, 50vw' />
        )}
        <div className='absolute inset-0 transition-opacity duration-300' style={{ background: `${project.color}20`, opacity: hovered ? 1 : 0 }} />
        <span className='absolute top-4 right-4 text-[10px] tracking-widest font-bold rounded-full px-2 py-1' style={{ background: 'rgba(247,244,239,0.8)', color: 'var(--fg-muted)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Info */}
      <div className='p-6 flex items-end justify-between gap-4'>
        <div>
          <span className='text-[10px] tracking-[0.18em] uppercase font-semibold' style={{ color: project.color }}>{project.category}</span>
          <h3 className='text-xl font-black mt-1 mb-2'>{project.title}</h3>
          <p className='text-sm leading-relaxed max-w-xs line-clamp-2' style={{ color: 'var(--fg-muted)' }}>{summary}</p>
        </div>
        <div className='flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300'
          style={{ background: hovered ? project.color : 'var(--bg-subtle)', color: hovered ? '#fff' : 'var(--fg-muted)' }}>
          <svg width='12' height='12' viewBox='0 0 14 14' fill='none'>
            <path d='M2 12L12 2M12 2H5M12 2v7' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
          </svg>
        </div>
      </div>
    </a>
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
            <p className='mt-3 text-base' style={{ color: 'var(--fg-muted)' }}>{t.projects_subtitle}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} summary={getProjectSummary(project, locale)} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

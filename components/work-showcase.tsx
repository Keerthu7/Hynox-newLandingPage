'use client'

import { useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Play, X } from 'lucide-react'
import './work-showcase.css'

type SceneKind = 'architecture' | 'object' | 'arrival' | 'film' | 'vertical' | 'production'

function Scene({ kind, label, play = false, onPlay, className = '' }: { kind: SceneKind; label: string; play?: boolean; onPlay?: () => void; className?: string }) {
  return <div className={`folio-scene folio-scene-${kind} ${className}`}>
    <span className="folio-scene-shape" aria-hidden="true" />
    {play && <button type="button" className="folio-play" aria-label={`Watch ${label.toLowerCase()}`} onClick={onPlay}><Play size={17} fill="currentColor" aria-hidden="true" /></button>}
    <span className="folio-scene-label">{label}</span>
  </div>
}

function SectionHeading({ number, label, children, note }: { number: string; label: string; children: React.ReactNode; note?: React.ReactNode }) {
  return <div className="folio-heading">
    <div><span className="folio-eyebrow">{number} — {label}</span><h2>{children}</h2></div>
    {note && <p>{note}</p>}
  </div>
}

export default function WorkShowcase() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [filmTitle, setFilmTitle] = useState('Project film')
  function openFilm(title: string) {
    setFilmTitle(title)
    dialogRef.current?.showModal()
  }
  return <div className="work-folio">
    <section className="folio-intro">
      <div className="folio-topline"><span>INDEPENDENT CREATIVE STUDIO</span><span>LOS ANGELES · EVERYWHERE</span></div>
      <div className="folio-title-row"><h1>Work &amp;<br /><em>client stories.</em></h1><span className="folio-counter">01 <i>/</i> 04</span></div>
      <div className="folio-intro-bottom"><p>We build identities, places and moving images<br />for brands with something to say.</p><a href="#folio-selected">Explore selected work <ArrowDown size={17} /></a></div>
    </section>

    <section className="folio-section folio-selected" id="folio-selected">
      <SectionHeading number="01" label="SELECTED WORK" note={<span className="folio-eyebrow">A SELECTION OF THINGS WE’VE MADE · 2022—26</span>}>Made to <em>move you.</em></SectionHeading>
      <div className="folio-project-grid">
        <article className="folio-project folio-project-main"><Scene kind="architecture" label="Temple City" play onPlay={() => openFilm('Temple City')} /><div className="folio-card-title"><h3>Temple City</h3><span>01 <a href="#folio-temple" aria-label="Explore Temple City"><ArrowUpRight size={17} /></a></span></div><p className="folio-eyebrow">ARCHITECTURE · FILM · PHOTOGRAPHY</p></article>
        <article className="folio-project folio-project-side"><Scene kind="object" label="Form, in focus" play onPlay={() => openFilm('Form, in focus')} /><div className="folio-card-title"><h3>Form, in focus</h3><span>02 <button onClick={() => openFilm('Form, in focus')} aria-label="Explore Form, in focus"><ArrowUpRight size={17} /></button></span></div><p className="folio-eyebrow">PRODUCT · BRAND FILM</p></article>
        <article className="folio-project folio-project-wide"><Scene kind="arrival" label="The art of arrival" play onPlay={() => openFilm('The art of arrival')} /><div className="folio-card-title"><h3>The art of arrival</h3><span>03 <button onClick={() => openFilm('The art of arrival')} aria-label="Explore The art of arrival"><ArrowUpRight size={17} /></button></span></div><p className="folio-eyebrow">HOSPITALITY · CAMPAIGN</p></article>
      </div>
    </section>

    <section className="folio-section folio-motion">
      <SectionHeading number="02" label="FILM & MOTION" note="A closer look at the ideas, creativity and execution behind our projects.">Work in <em>motion.</em></SectionHeading>
      <Scene kind="film" label="Featured film" play onPlay={() => openFilm('Featured film')} className="folio-featured-film" />
      <div className="folio-film-caption folio-eyebrow"><span>01 / FEATURED FILM</span><span>PROJECT FILMS · COMING SOON</span></div>
      <div className="folio-film-grid">
        <article><Scene kind="vertical" label="Vertical film" play onPlay={() => openFilm('Stories in a scroll')} /><div className="folio-card-title"><h3>Stories in a scroll</h3><span>9:16</span></div><p className="folio-eyebrow">SOCIAL · REELS</p></article>
        <article><Scene kind="production" label="Production still" play onPlay={() => openFilm('Behind the frame')} /><div className="folio-card-title"><h3>Behind the frame</h3><span>16:9</span></div><p className="folio-eyebrow">PRODUCTION · BTS</p></article>
      </div>
    </section>

    <section className="folio-section folio-stills">
      <SectionHeading number="03" label="STILLS & STUDIES" note={<>Light, texture and the moments in between.<br />A collection from the studio floor.</>}>Captured in<br /><em>every detail.</em></SectionHeading>
      <div className="folio-stills-grid">
        <article><Scene kind="architecture" label="Quiet geometry" /><div className="folio-still-caption"><h3>Quiet geometry</h3><span>ARCHITECTURE</span></div></article>
        <article className="folio-still-object"><Scene kind="object" label="Objects of desire" /><div className="folio-still-caption"><h3>Objects of desire</h3><span>PRODUCT</span></div></article>
        <div className="folio-still-stack"><article><Scene kind="production" label="A softer light" /><div className="folio-still-caption"><h3>A softer light</h3><span>CAMPAIGN</span></div></article><article><Scene kind="arrival" label="Behind the frame" /><div className="folio-still-caption"><h3>Behind the frame</h3><span>ON SET</span></div></article></div>
      </div>
    </section>

    <section className="folio-section folio-temple" id="folio-temple">
      <div className="folio-topline"><span>04 — FEATURED PROJECT · T3 ASSOCIATES</span><span>TEMPLE CITY, CALIFORNIA</span></div>
      <div className="folio-temple-heading"><div><p>Architecture, considered.</p><h2>Temple<br /><em>City.</em></h2></div><p>A study in place, light and the considered details<br />that make a building feel like it belongs.</p></div>
      <div className="folio-temple-grid"><Scene kind="architecture" label="Temple City project film" play onPlay={() => openFilm('Temple City project film')} /><div><Scene kind="architecture" label="Temple City architecture" /><Scene kind="production" label="Temple City production" /></div></div>
      <div className="folio-temple-bottom folio-eyebrow"><span>T3 ASSOCIATES</span><span>ARCHITECTURE · FILM · PHOTOGRAPHY</span><button onClick={() => openFilm('Temple City case study')}>VIEW CASE STUDY <ArrowUpRight size={15} /></button></div>
    </section>

    <section className="folio-section folio-company">
      <SectionHeading number="05" label="IN GOOD COMPANY" note={<>Built together with thoughtful teams<br />and ambitious people.</>}>Good people.<br /><em>Good work.</em></SectionHeading>
      <div className="folio-company-logos" aria-label="Collaborations and creative disciplines"><span className="folio-logo-t3">T3<small>ASSOCIATES</small></span><span className="folio-logo-brand">BRAND<br />IDENTITY</span><span>FILM<br />&amp; MOTION</span><span>PHOTOGRAPHY</span><span>CAMPAIGNS</span></div>
    </section>

    <section className="folio-section folio-testimonials">
      <SectionHeading number="06" label="THE HUMAN PART" note={<>The best part of the work is who we get<br />to make it with.</>}>Our clients.<br /><em>Their words.</em></SectionHeading>
      <div className="folio-quote"><span aria-hidden="true">“</span><div><p>Client conversations and testimonial films will be featured here.</p><small>We only publish feedback with client approval.</small></div><span className="folio-eyebrow">TESTIMONIAL FILMS<br />COMING SOON</span></div>
    </section>

    <dialog className="folio-film-dialog" ref={dialogRef} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close() }} aria-labelledby="folio-film-title"><button className="folio-dialog-close" type="button" aria-label="Close project preview" onClick={() => dialogRef.current?.close()}><X size={22} /></button><span className="folio-eyebrow">PROJECT FILMS · COMING SOON</span><h2 id="folio-film-title">{filmTitle}</h2><p>The full project film will be featured here soon.</p><a href="/contact">Discuss a project <ArrowUpRight size={16} /></a></dialog>
  </div>
}

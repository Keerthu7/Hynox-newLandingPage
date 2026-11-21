'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import WorkShowcase from '@/components/work-showcase'
import AboutShowcase from '@/components/about-showcase'
import CompanyAbout from '@/components/company-about'
import { ArrowDown, ArrowUpRight, Menu, X, Play } from 'lucide-react'

const buildServices = [
  ['01', 'Web development', 'Business websites, web applications, dashboards and platforms.'],
  ['02', 'Mobile app development', 'Android and iOS applications built around real business needs.'],
  ['03', 'Custom software', 'ERP, CRM, billing, inventory and the systems behind your business.'],
  ['04', 'Shopify development', 'Custom storefronts, integrations and considered checkout experiences.'],
  ['05', 'AI & machine learning', 'Intelligent workflows, useful automation and AI integrations.'],
]
const growServices = [
  ['01', 'Branding & identity', 'Strategy, positioning, identity and the guidelines that bring it together.'],
  ['02', 'Social media', 'Content strategy, creative production and thoughtful management.'],
  ['03', 'Digital marketing', 'Performance campaigns, SEO and lead generation built to learn.'],
  ['04', 'Photo & film', 'Brand shoots, product photography and cinematic storytelling.'],
]
const projects = [
  { name: 'Graaps UK', category: 'Shopify · E-commerce Development', image: '/graaps_web.png', width: 2940, height: 1678, alt: 'Graaps fashion e-commerce website developed by HYNOX' },
  { name: 'JP Interiors App', category: 'Mobile App · Custom Software', image: '/JpApp_works.png', width: 3840, height: 2160, alt: 'JP Interiors mobile application for quotations and business management' },
  { name: 'Aharraa', category: 'Business Website · Web Development', image: '/aharraa_web.png', width: 1901, height: 859, alt: 'Aharraa food business website developed by HYNOX' },
  { name: 'Team3 Associates', category: 'Business Website · Web Development', image: '/team3_web.png', width: 1355, height: 685, alt: 'Team3 Associates website developed by HYNOX' },
]

function ServiceList({ title, intro, items, id }: { title: string; intro: string; items: string[][]; id: string }) {
  return <section className="service-section" id={id}>
    <div className="service-intro"><span className="eyebrow">{title === 'Build' ? '01 / BUILD' : '02 / GROW'}</span><h3>{title === 'Build' ? <>Technology that moves<br />businesses forward.</> : <>Brands built<br />to be seen.</>}</h3><p>{intro}</p></div>
    <div className="service-list">{items.map(([number, name, description]) => {
      const content = <><span className="service-number">{number}</span><div><h4>{name}</h4><p>{description}</p></div><ArrowUpRight aria-hidden="true" size={18} /></>
      return <Link className="service-row" href={title === 'Grow' ? '/branding' : '/work'} key={name}>{content}</Link>
    })}</div>
  </section>
}

type SiteView = 'home' | 'services' | 'work' | 'about' | 'branding' | 'contact'

const pageIntros = {
  services: ['SOFTWARE & CREATIVE SERVICES', 'Build your business. Grow your brand.', 'Website development, mobile apps, custom software and creative services from Coimbatore, Tamil Nadu.'],
  work: ['SELECTED PROJECTS', 'Built for real businesses.', 'Explore our e-commerce stores, business websites and custom mobile applications.'],
  about: ['ABOUT HYNOX', 'Technology and creativity. One team.', 'A software development and creative team based in Coimbatore, working with businesses in India and beyond.'],
  contact: ['CONTACT HYNOX', 'Your next project starts here.', 'Talk to us about website development, custom software, branding or visual content.'],
}

export default function SitePage({ view = 'home' }: { view?: SiteView }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRevealRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (view !== 'home') return
    let frame = 0
    const update = () => {
      frame = 0
      const element = heroRevealRef.current
      if (!element) return
      const progress = Math.min(1, Math.max(0, (window.innerHeight - element.getBoundingClientRect().top - 90) / (window.innerHeight * .65)))
      element.style.setProperty('--hero-reveal', String(progress))
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [view])
  const reviewVideoRef = useRef<HTMLVideoElement>(null)
  const [reviewPlaying, setReviewPlaying] = useState(false)
  const [reviewPlaybackError, setReviewPlaybackError] = useState(false)
  const floatingVideoRef = useRef<HTMLVideoElement>(null)
  const [floatingReviewVisible, setFloatingReviewVisible] = useState(true)
  const reviewDialogRef = useRef<HTMLDialogElement>(null)
  const popupVideoRef = useRef<HTMLVideoElement>(null)
  const [popupPlaying, setPopupPlaying] = useState(false)
  async function openFloatingReview() {
    reviewVideoRef.current?.pause()
    reviewDialogRef.current?.showModal()
    document.body.style.overflow = 'hidden'
    try { await popupVideoRef.current?.play() } catch { setPopupPlaying(false) }
  }
  function closeFloatingReview() {
    reviewDialogRef.current?.close()
  }
  async function togglePopupPlayback() {
    const video = popupVideoRef.current
    if (!video) return
    if (video.paused) {
      try { await video.play() } catch { setPopupPlaying(false) }
    } else { video.pause() }
  }
  async function toggleReviewPlayback() {
    const video = reviewVideoRef.current
    if (!video) return
    if (video.paused) {
      floatingVideoRef.current?.pause()
      setReviewPlaybackError(false)
      try {
        await video.play()
      } catch {
        setReviewPlaying(false)
        setReviewPlaybackError(true)
        video.controls = true
      }
    } else {
      video.pause()
    }
  }
  const closeMenu = () => setMenuOpen(false)
  return <><main>
    <header className="site-header"><Link className="wordmark" href="/" aria-label="Hynox home">HYNOX<span className="wordmark-dot">.</span></Link><span className="header-descriptor">SOFTWARE & BRANDING COMPANY</span><nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation"><Link href="/#services" onClick={closeMenu}>Services</Link><Link href="/work" onClick={closeMenu}>Work</Link><Link href="/about" onClick={closeMenu}>About</Link><Link href="/contact" onClick={closeMenu}>Contact</Link></nav><Link className="header-cta" href="/contact">Start a project <ArrowUpRight size={15} /></Link><button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></header>
    {view !== 'home' && view !== 'work' && view !== 'about' && view !== 'branding' && <section className="page-intro">
      <Link href="/" className="eyebrow">HYNOX / HOME</Link>
      <span className="eyebrow">{pageIntros[view][0]}</span>
      <h1>{pageIntros[view][1]}</h1>
      <p>{pageIntros[view][2]}</p>
    </section>}
    {(view === 'home') && <>
    <section className="hero" id="top"><div className="hero-topline"><span><i className="status-dot" /> INDEPENDENT DIGITAL PARTNER</span><span>BASED IN INDIA · WORKING EVERYWHERE</span></div><div className="hero-copy"><h1>Building brands.<br /><span>Developing technology.</span></h1><div className="hero-aside"><p>HYNOX delivers website development, custom software, branding and digital marketing services to help your business grow.</p><a className="text-link" href="/services">Explore our digital services <ArrowUpRight size={16} /></a></div></div><div ref={heroRevealRef} className="hero-image"><video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/hynox-hero.png" aria-label="HYNOX brand showcase"><source src="/hero%20section-video.mp4" type="video/mp4" /></video><div className="hero-image-caption"><span>DESIGN WITH INTENT.</span><span>TECHNOLOGY WITH PURPOSE.</span></div><a href="/services" className="scroll-cue" aria-label="Scroll to services"><ArrowDown size={17} /></a></div><div className="hero-bottom"><span>ONE PARTNER. TWO CAPABILITIES.</span><span>SCROLL TO EXPLORE ↓</span></div></section>
    </>}
    {(view === 'home' || view === 'services') && <>
    <section className="services" id="services"><div className="section-heading"><span className="eyebrow">WHAT WE DO / 01—02</span><h2>Made to work.<br /><em>Made to matter.</em></h2><p>We bring the right people and perspectives together to build what your business needs next.</p></div><ServiceList title="Build" intro="Practical technology, thoughtfully made." items={buildServices} id="build"/><ServiceList title="Grow" intro="Distinctive brands with room to grow." items={growServices} id="grow"/></section>
    </>}
    {view === 'services' && <section className="service-details">
      <div><span className="eyebrow">HOW WE CAN HELP</span><h2>From first idea<br />to everyday growth.</h2></div>
      <article><h3>E-commerce & online stores</h3><p>Shopify development, store integrations and product content to support your online retail business.</p></article>
      <article><h3>Business systems & automation</h3><p>Custom ERP, inventory, billing and workflow tools built around the way your team works.</p></article>
      <article><h3>Brand content & marketing</h3><p>Brand identity, social media content, Meta and Google Ads, product photography and video production.</p></article>
    </section>}
    {(view === 'home') && <>
    <section className="products" aria-labelledby="products-title"><div className="products-heading"><span className="eyebrow">OUR PRODUCTS</span><h2 id="products-title">Products built by Hynox.</h2></div><div className="products-grid"><a className="product-card" href="https://campus.hynox.in/" target="_blank" rel="noreferrer"><div className="product-preview campus-preview" aria-hidden="true"><div className="preview-top"><span>HYNOX CAMPUS</span><span className="preview-avatar">H</span></div><div className="preview-welcome">Learn by doing.<br /><span>Build what&apos;s next.</span></div><div className="preview-course"><span className="preview-course-mark">01</span><span><b>Industry-ready skills</b><small>Explore your learning path</small></span><ArrowUpRight size={14} /></div></div><div className="product-meta"><span>01 / PRODUCT</span><span>EdTech · Learning Platform</span></div><h3>HYNOX CAMPUS</h3><p>An industry-integrated learning platform bridging education and real-world skills.</p><span className="product-link">Explore Product <ArrowUpRight size={15} /></span></a><a className="product-card" href="https://billdesk.hynox.in/" target="_blank" rel="noreferrer"><div className="product-preview billing-preview" aria-hidden="true"><div className="preview-top"><span>BILLDESK</span><span className="billing-dot" /></div><div className="billing-title">Your business,<br />in good order.</div><div className="billing-stats"><span><small>INVOICES</small><b>Ready to go</b></span><span><small>THIS MONTH</small><b>On track</b></span></div><div className="billing-lines"><i /><i /><i /></div></div><div className="product-meta"><span>02 / PRODUCT</span><span>Billing Software</span></div><h3>BILLDESK</h3><p>Simple billing and business management software for everyday operations.</p><span className="product-link">Explore Product <ArrowUpRight size={15} /></span></a></div></section>
    </>}
    {(view === 'home') && <>
    <section className="work" id="work"><div className="work-heading"><div><span className="eyebrow">A FEW THINGS WE&apos;VE MADE / 2022—26</span><h2>Selected work<span className="wordmark-dot">.</span></h2></div><p>Ideas built into real businesses.<br />A selection of collaborations.</p></div><div className="project-grid">{projects.map((project, index) => <a className={`project-card project-${index + 1}`} href="/work" key={project.name}><div className="project-image"><Image src={project.image} alt={project.alt} width={project.width} height={project.height} sizes="(max-width: 640px) 88vw, 45vw" className="project-screenshot" /><span className="project-index">0{index + 1}</span><span className="project-arrow"><ArrowUpRight size={20} /></span></div><div className="project-info"><h3>{project.name}</h3><span>{project.category}</span></div></a>)}</div><a className="all-work-link" href="/contact">Have a project in mind? <span>Tell us about it <ArrowUpRight size={16} /></span></a></section>
    </>}
    {(view === 'home') && <>
    <section className="clients"><span className="eyebrow">GOOD COMPANY / GOOD WORK</span><h2>Trusted by businesses<br />building their future.</h2><div className="client-marquee" aria-label="Selected client names"><div className="marquee-track"><span>SUGARSTAR</span><span>TEEREX</span><span>TEAM3</span><span>GRAAPS</span><span>KIDO CARE</span><span>AHARRAA</span><span>JP INTERIORS</span><span aria-hidden="true">SUGARSTAR</span><span aria-hidden="true">TEEREX</span><span aria-hidden="true">TEAM3</span></div></div><p className="client-note">A few of the teams we&apos;ve had the pleasure of building with.</p></section>
    </>}
    {(view === 'home') && <>
    <section className="story" id="client-review" aria-labelledby="client-review-title">
      <div className="story-visual">
        <video ref={reviewVideoRef} id="review-video" className="story-video" playsInline webkit-playsinline="true" preload="metadata" onClick={toggleReviewPlayback} onError={() => setReviewPlaybackError(true)} onPlay={() => setReviewPlaying(true)} onPause={() => setReviewPlaying(false)} onEnded={() => setReviewPlaying(false)} aria-label="Client review by Prabhakar S from Team3 Associates" aria-describedby="client-review-description">
          <source src="/review-video.mp4#t=0.1" type="video/mp4" />
          Your browser does not support embedded video. <a href="/review-video.mp4">Watch the Team3 Associates client review.</a>
        </video>
        <button hidden={reviewPlaybackError || reviewPlaying} className="review-playback" type="button" onClick={toggleReviewPlayback} aria-controls="review-video" aria-label={reviewPlaying ? 'Pause client review' : 'Play client review'}>
          <Play size={24} fill="currentColor" aria-hidden="true" />
        </button>
      </div>
      <div className="story-copy">
        {reviewPlaybackError && <p role="status">Having trouble playing? <a href="/review-video.mp4" target="_blank" rel="noreferrer">Open the review video</a>.</p>}
        <span className="eyebrow">CLIENT REVIEW / TEAM3 ASSOCIATES</span>
        <h2 id="client-review-title">A website built.<br />A partnership growing.</h2>
        <p className="story-person">Prabhakar S <span>Team3 Associates</span></p>
        <p id="client-review-description">Prabhakar S shares Team3 Associates’ experience with HYNOX—from business website development to ongoing brand photography and videography.</p>
        <a href="/contact" className="text-link">Discuss your website or brand content <ArrowUpRight size={16} /></a>
      </div>
    </section>
    </>}
    {view === 'work' && <WorkShowcase />}
    {view === 'branding' && <AboutShowcase />}
    {view === 'about' && <CompanyAbout />}
    {(view === 'home') && <>
    <section className="about" id="about"><span className="eyebrow">A CONNECTED WAY OF WORKING</span><h2>One partner. Two capabilities.<br /><em>Endless possibilities.</em></h2><div className="about-points"><article><span>01</span><h3>Technology + creativity</h3><p>Engineering and creative capabilities, together in one team.</p></article><article><span>02</span><h3>Built around your business</h3><p>Solutions shaped around your goals, workflows and customers.</p></article><article><span>03</span><h3>From idea to execution</h3><p>Strategy, design and delivery in one connected process.</p></article></div></section>
    </>}
    {(view === 'home' || view === 'contact' || view === 'services' || view === 'work' || view === 'about' || view === 'branding') && <>
    <section className="contact" id="contact"><div className="contact-intro"><span className="eyebrow">HAVE SOMETHING IN MIND?</span><h2>Let&apos;s build<br /><em>something meaningful.</em></h2><p>Tell us a little about what you&apos;re working on. We&apos;ll take it from there.</p><a className="whatsapp-link" href="https://wa.me/918870524355?text=Hi%20Hynox%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noreferrer">Prefer WhatsApp? Start a chat <ArrowUpRight size={15} /></a></div></section>
    </>}
    <footer className="footer"><a className="wordmark" href="/#top">HYNOX<span className="wordmark-dot">.</span></a><span>BUILDING BRANDS. DEVELOPING TECHNOLOGY.</span><a href="mailto:thehynoxofficial@gmail.com">HELLO@HYNOX.IN <ArrowUpRight size={13} /></a><small>© HYNOX 2026</small></footer>
    </main>
    {floatingReviewVisible && <aside className="floating-review" aria-label="Team3 Associates client review">
      <video ref={floatingVideoRef} id="floating-review-video" className="floating-review-video" playsInline preload="metadata" aria-label="Prabhakar S client review">
        <source src="/review-video.mp4#t=0.1" type="video/mp4" />
      </video>
      <button className="floating-review-toggle" type="button" onClick={openFloatingReview} aria-haspopup="dialog" aria-label="Open client review video">
        <Play size={18} fill="currentColor" aria-hidden="true" />
      </button>
      <span className="floating-review-label"><span /> REVIEW</span>
      <button className="floating-review-close" type="button" aria-label="Close floating review" onClick={() => { floatingVideoRef.current?.pause(); setFloatingReviewVisible(false) }}><X size={14} aria-hidden="true" /></button>
    </aside>}
    <dialog ref={reviewDialogRef} className="review-dialog" aria-label="Team3 Associates client review" onClose={() => { popupVideoRef.current?.pause(); document.body.style.overflow = '' }} onClick={event => { if (event.target === event.currentTarget) closeFloatingReview() }}>
      <div className="review-dialog-player">
        <video ref={popupVideoRef} id="popup-review-video" onClick={togglePopupPlayback} playsInline preload="none" onPlay={() => setPopupPlaying(true)} onPause={() => setPopupPlaying(false)} onEnded={() => setPopupPlaying(false)} aria-label="Prabhakar S of Team3 Associates reviews HYNOX">
          <source src="/review-video.mp4#t=0.1" type="video/mp4" />
        </video>
        <button hidden={popupPlaying} className="review-playback" type="button" onClick={togglePopupPlayback} aria-controls="popup-review-video" aria-label={popupPlaying ? 'Pause review' : 'Play review'}>
          <Play size={24} fill="currentColor" aria-hidden="true" />
        </button>
        <button className="review-dialog-close" type="button" onClick={closeFloatingReview} aria-label="Close review video"><X size={22} /></button>
      </div>
    </dialog>
  </>
}

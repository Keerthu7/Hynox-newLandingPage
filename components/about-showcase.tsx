'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Plus, Minus, X, Play, Pause } from 'lucide-react'
import './about-showcase.css'

const services = [
  { title: <>Brand identity<br />&amp; strategy</>, description: 'Build a brand with clarity, character, and a distinctive identity.', items: ['Brand Strategy & Positioning', 'Brand Naming', 'Logo Design', 'Visual Identity Systems', 'Typography & Color Systems', 'Brand Guidelines', 'Rebranding'] },
  { title: <>Graphic &amp;<br />packaging design</>, description: 'Transform products and ideas into memorable visual experiences.', items: ['Packaging Design', 'Print Design', 'Brochures & Catalogues', 'Editorial Design', 'Business Stationery', 'Marketing Collateral', 'Presentation Design'] },
  { title: <>Photography &amp;<br />videography</>, description: 'Capture your brand through visuals that communicate quality and emotion.', items: ['Brand Photography', 'Product Photography', 'Architectural Photography', 'Commercial Films', 'Brand Films', 'Promotional Videos', 'Reels & Short-form Content'] },
  { title: <>Content &amp; creative<br />production</>, description: 'Create content that captures attention and builds meaningful connections.', items: ['Creative Direction', 'Campaign Concepts', 'Content Strategy', 'Scriptwriting', 'Art Direction', 'Social Media Content'] },
  { title: <>Digital<br />branding</>, description: 'Shape a consistent brand presence across every digital touchpoint.', items: ['Website Design', 'Digital Brand Guidelines', 'Social Media Identity', 'UI & UX Design', 'E-commerce Creative', 'Digital Campaign Assets'] },
]

function Topline({ left, right }: { left: string; right: string }) {
  return <div className="about-topline"><span>{left}</span><span>{right}</span></div>
}

function Heading({ children, note }: { children: React.ReactNode; note?: React.ReactNode }) {
  return <div className="about-heading"><h2>{children}</h2>{note && <p>{note}</p>}</div>
}

function SamplePhoto({ image, alt, className = '', onClick }: { image: string; alt: string; className?: string; onClick?: () => void }) {
  const picture = <Image src={image.startsWith('/') ? image : `/about-reference/${image}.jpg`} alt={alt} fill sizes="(max-width:620px) 88vw, 48vw" />
  return onClick ? <button type="button" className={`about-sample ${className}`} onClick={onClick} aria-label={`Preview ${alt.toLowerCase()}`}>{picture}</button> : <div className={`about-sample ${className}`}>{picture}</div>
}

function ShowcaseVideo({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const thumbnailRef = useRef<HTMLVideoElement>(null)
  const filmRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ratio, setRatio] = useState(16 / 9)

  function keepSilent(event: React.SyntheticEvent<HTMLVideoElement>) {
    event.currentTarget.muted = true
    event.currentTarget.volume = 0
  }

  function openFilm() {
    thumbnailRef.current?.pause()
    dialogRef.current?.showModal()
    const film = filmRef.current
    if (film) {
      film.muted = true
      film.volume = 0
      film.currentTime = 0
      void film.play().catch(() => setPlaying(false))
    }
  }

  function closeFilm() { dialogRef.current?.close() }
  function toggleFilm() {
    const film = filmRef.current
    if (!film) return
    if (film.paused) void film.play().catch(() => setPlaying(false))
    else film.pause()
  }

  return <>
    <button type="button" className={`about-sample about-video ${className}`} onClick={openFilm} aria-label={`Open ${label} in a larger player`}>
      <video ref={thumbnailRef} src={src} autoPlay muted loop playsInline preload="metadata" onVolumeChange={keepSilent} onLoadedMetadata={event => { keepSilent(event); setRatio(event.currentTarget.videoWidth / event.currentTarget.videoHeight) }} aria-hidden="true" />
      <span className="about-video-control"><Play size={25} fill="currentColor" /></span>
    </button>
    <dialog ref={dialogRef} className="about-film-dialog" aria-label={label} onClick={event => { if (event.target === event.currentTarget) closeFilm() }} onClose={() => { filmRef.current?.pause(); void thumbnailRef.current?.play().catch(() => {}) }}>
      <button type="button" className="about-film-close" aria-label="Close video" onClick={closeFilm}><X size={24} /></button>
      <div className="about-film-frame" style={{ aspectRatio: ratio, width: `min(90vw, ${82 * ratio}dvh, 1200px)` }}>
        <video ref={filmRef} src={src} muted playsInline preload="none" onVolumeChange={keepSilent} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
        <button type="button" className="about-film-toggle" onClick={toggleFilm} aria-label={playing ? `Pause ${label}` : `Play ${label}`}><span className="about-video-control">{playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}</span></button>
      </div>
    </dialog>
  </>
}

export default function AboutShowcase() {
  const [activeService, setActiveService] = useState<number | null>(0)
  const [preview, setPreview] = useState('')
  const previewRef = useRef<HTMLDialogElement>(null)
  function openPreview(title: string) { setPreview(title); previewRef.current?.showModal() }
  return <div className="about-studio">
    <section className="about-brand-hero">
      <Topline left="HYNOX / BRANDING & CREATIVE" right="COIMBATORE, INDIA" />
      <h1>Make your brand<br />impossible to <em>ignore.</em></h1>
      <div className="about-hero-bottom"><p>We build distinctive identities, compelling visuals, and<br />digital experiences that make businesses stand out.</p><div><Link href="/contact" className="about-solid-link">Start a project <ArrowUpRight size={16} /></Link><a href="#about-capabilities">Explore our services <ArrowDown size={16} /></a></div></div>
      <div className="about-brand-image"><Image src="/about-reference/brand-flatlay.jpg" alt="Black and green brand stationery, a bottle and a lemon on a sunlit stone surface" width={2140} height={1040} sizes="90vw" priority /></div>
      <a className="about-scroll" href="#about-perspective">SCROLL TO EXPLORE <ArrowDown size={14} /></a>
    </section>

    <section className="about-block about-perspective" id="about-perspective">
      <Topline left="01 / A POINT OF VIEW" right="BUILT WITH INTENTION" />
      <div className="about-perspective-grid"><h2>Great brands are<br />built with <em>intention.</em></h2><div><span className="about-star" aria-hidden="true">✳</span><p>From the first impression to every interaction, we create brands that look distinctive, feel meaningful, and leave a lasting impression.</p><small>INDEPENDENT THINKING. COIMBATORE ROOTS.</small></div></div>
      <div className="about-rule-line"><span>GOOD DESIGN DOESN’T SHOUT.</span><span>IT STAYS WITH YOU.</span></div>
    </section>

    <section className="about-block about-capabilities" id="about-capabilities">
      <Topline left="02 / WHAT WE DO" right="STRATEGY MEETS CRAFT" />
      <Heading note={<>One connected creative partner, from the first<br />spark to the finished experience.</>}>Every detail.<br /><em>Considered.</em></Heading>
      <div className="about-service-list">{services.map((service, i) => <article className="about-service" key={i}>
        <button className="about-service-toggle" type="button" aria-expanded={activeService === i} aria-controls={`about-service-${i}`} onClick={() => setActiveService(activeService === i ? null : i)}><span className="about-service-number">0{i + 1}</span><h3>{service.title}</h3><p>{service.description}</p>{activeService === i ? <Minus size={17} /> : <Plus size={17} />}</button>
        {activeService === i && <div className="about-service-panel" id={`about-service-${i}`}><span>IN OUR TOOLKIT</span><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul><Link href="/contact">Let’s talk about it <ArrowUpRight size={13} /></Link></div>}
      </article>)}</div>
    </section>

    <section className="about-block about-directions">
      <Topline left="03 / SELECTED DIRECTIONS" right="CONCEPTUAL WORK" />
      <Heading note={<>A glimpse into the worlds we love to create.<br />Conceptual studies, made to imagine what’s<br />possible.</>}>Visuals that speak<br />before <em>words.</em></Heading>
      <div className="about-concepts">
        <article><button type="button" className="about-concept about-concept-form" onClick={() => openPreview('Form follows feeling')} aria-label="Explore Form follows feeling"><small>H / 01</small><span>FORM<br /><em>FOLLOWS</em><br />FEELING</span><small>A STUDY IN RESTRAINT<br />TYPE / TONE / TEXTURE</small></button><div className="about-concept-caption"><h3>Form follows feeling</h3><span>01</span><p>Conceptual identity / 2025</p></div></article>
        <div className="about-concept-stack"><article><button type="button" className="about-concept about-concept-objects" onClick={() => openPreview('Objects of everyday')} aria-label="Explore Objects of everyday"><span className="about-object-book">OBJECTS<br />OF EVERYDAY<small>01</small></span><ArrowUpRight className="about-concept-arrow" size={16} /></button><div className="about-concept-caption"><h3>Objects of everyday</h3><span>02</span><p>Packaging study / 2025</p></div></article><article><button type="button" className="about-concept about-concept-ritual" onClick={() => openPreview('A quieter ritual')} aria-label="Explore A quieter ritual"><small>A QUIETER<br />RITUAL</small><span>A</span><ArrowUpRight className="about-concept-arrow" size={16} /></button><div className="about-concept-caption"><h3>A quieter ritual</h3><span>03</span><p>Art direction / 2025</p></div></article></div>
      </div>
      <p className="about-note"><span aria-hidden="true">✳</span> These are creative explorations, not client commissions. Your story will be uniquely yours.</p>
    </section>

    <section className="about-block about-visual-stories">
      <Topline left="04 / VISUAL STORIES" right="PHOTOGRAPHY & MOTION" />
      <Heading note={<>Photography, moving images, and the<br />moments in between.</>}>Visual stories.<br /><em>Creative work.</em></Heading>
      <div className="about-story-grid">
        <div className="about-story-wide"><SamplePhoto image="/img1.png" alt="Illuminated residence and landscaped garden at night" /><ShowcaseVideo src="/promotional%20video1.mp4" label="Promotional video one" /></div>
        <SamplePhoto image="/about-reference/product-still-clean.png" alt="Amber dropper bottle on stone — Product Photography: An everyday ritual" className="about-story-tall" />
        <SamplePhoto image="/img3.jpg" alt="Modern glass-fronted commercial building" className="about-story-tall about-story-rotated" />
        <div className="about-story-wide"><SamplePhoto image="/img4.png" alt="Traditional courtyard with stone pillars and timber ceiling" /><ShowcaseVideo src="/promotional%20video2.mp4" label="Promotional video two" /></div>
        <ShowcaseVideo src="/Reel.mp4" label="Brand reel" className="about-story-tall" />
        <SamplePhoto image="/img5.png" alt="Illuminated commercial building at night" className="about-story-tall" />
      </div>
      <p className="about-note">Architectural photography, promotional films, and creative reels by HYNOX.</p>
    </section>

    <section className="about-block about-client-work">
      <Topline left="05 / SELECTED CLIENT WORK" right="FEATURED PROJECT" />
      <Heading note={<span className="about-client-name">T3 ASSOCIATES<em>Temple City</em></span>}>Selected<br /><em>client work.</em></Heading>
      <div className="about-client-grid"><div><SamplePhoto image="/temple-city-client.png" alt="Temple City exterior with timber roof and brick facade" className="about-client-architecture" /></div><div><ShowcaseVideo src="/Temple%20city.mp4" label="Temple City project film for T3 Associates" className="about-client-production" /><p className="about-client-services">BRANDING · PHOTOGRAPHY · VIDEOGRAPHY · CREATIVE PRODUCTION</p><p>Temple City — a project film for T3 Associates.</p></div></div>
    </section>

    <section className="about-block about-partners">
      <Topline left="06 / OUR CREATIVE PARTNERS" right="CLIENT NAMES · TYPE ONLY" />
      <Heading>Good people.<br /><em>Good work.</em></Heading>
      <div className="about-partner-names"><span>T3 Associates</span><span>JP Aluminium Interior</span><span>Sun Holidays</span></div>
      <p className="about-note">Official client logo files were not present in the project. Names are shown as plain text, not recreated logos.</p>
    </section>

    <section className="about-block about-process">
      <Topline left="07 / HOW WE GET THERE" right="FROM FIRST THOUGHT TO FINISH" />
      <Heading note={<>A clear process makes room for the<br />unexpected.</>}>From idea<br />to <em>identity.</em></Heading>
      <div className="about-process-grid">{[['Discover', 'Understand your business, audience, and vision.'], ['Define', 'Establish strategy, positioning, and creative direction.'], ['Design', 'Create your visual identity and creative assets.'], ['Deliver', 'Build a consistent brand experience across every touchpoint.']].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><div className="about-process-track" /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="about-block about-industries">
      <Topline left="08 / WHO WE WORK WITH" right="GOOD COMPANY, GREAT AMBITION" />
      <div className="about-industry-grid"><h2>Built for<br />businesses with<br /><em>ambition.</em></h2><ol>{['Fashion & Lifestyle', 'Retail & E-commerce', 'Food & Hospitality', 'Travel & Tourism', 'Healthcare', 'Real Estate', 'Technology & Startups', 'Education'].map((industry, i) => <li key={industry}><span>0{i + 1}</span>{industry}</li>)}</ol></div>
    </section>

    <dialog ref={previewRef} className="about-concept-dialog" aria-labelledby="about-preview-title" onClick={event => { if (event.target === event.currentTarget) previewRef.current?.close() }}><button type="button" aria-label="Close creative preview" onClick={() => previewRef.current?.close()}><X size={22} /></button><small>HYNOX / CREATIVE DIRECTION</small><h2 id="about-preview-title">{preview}</h2><p>This is a visual direction sample. Contact us to discuss a creative project for your brand.</p><Link href="/contact">Start a conversation <ArrowUpRight size={16} /></Link></dialog>
  </div>
}

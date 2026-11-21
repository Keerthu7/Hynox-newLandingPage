import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, ArrowRight } from 'lucide-react'
import './company-about.css'

function Label({ left, right }: { left: string; right: string }) {
  return <div className="company-label"><span>{left}</span><span>{right}</span></div>
}

function Heading({ children, note }: { children: React.ReactNode; note?: React.ReactNode }) {
  return <div className="company-heading"><h2>{children}</h2>{note && <p>{note}</p>}</div>
}

const team = [
  ['Sample profile 01', 'Founder & Strategy'],
  ['Sample profile 02', 'Creative Direction'],
  ['Sample profile 03', 'Software Development'],
  ['Mira Kapoor', 'Brand Designer'],
  ['Karthik Nair', 'Technology Lead'],
  ['Isha Shah', 'Growth & Operations'],
]

export default function CompanyAbout() {
  return <div className="company-about">
    <section className="company-hero">
      <Label left="● INDEPENDENT BY DESIGN" right="ABOUT HYNOX · 2026" />
      <div className="company-hero-type"><h1><span>Building</span><span className="company-brands">brands<span className="company-dot">.</span></span><span className="company-developing">Developing <em>technology.</em></span></h1><div className="company-orbit" aria-hidden="true"><span>✳</span><small>IDEAS IN MOTION</small></div></div>
      <div className="company-hero-bottom"><div><p>We are a Software &amp; Branding Company helping businesses transform ideas into technology, build meaningful brands, and create experiences that move businesses forward.</p><div className="company-hero-links"><Link className="company-solid" href="/services">Explore our services <ArrowRight size={16} /></Link><Link className="company-text-link" href="/work">View our works <ArrowUpRight size={15} /></Link></div></div><a className="company-scroll" href="#company-story">SCROLL TO EXPLORE <ArrowDown size={16} /></a><span className="company-page-number">01 / 10</span></div>
    </section>

    <section className="company-section company-story" id="company-story">
      <Label left="01 — OUR STORY" right="A SMALL IDEA, A LONG WAY TO GO" />
      <div className="company-story-grid"><h2>Built with a vision<br /><span>to create.</span></h2><div><p className="company-story-lead">Hynox started with a simple vision — to build meaningful technology and create products that make a real difference.</p><p>What began as an entrepreneurial journey during college grew into work across software, digital products, branding, and creative solutions. We believe businesses need more than a website or a logo: they need the right technology, a strong identity, and a clear way to communicate their value.</p><p>Today, we bring technology and creativity together to help businesses build, grow, and evolve.</p><a className="company-text-link" href="#company-people">Get to know us <ArrowRight size={16} /></a></div></div>
      <div className="company-story-rule"><span>01</span><i /><span>BUILT ON CURIOSITY</span><b aria-hidden="true">✳</b><span>GROWING WITH PURPOSE</span></div>
    </section>

    <section className="company-section company-disciplines" id="company-disciplines">
      <Label left="02 — WHAT WE DO" right="ONE PARTNER. TWO DISCIPLINES." />
      <Heading>Two disciplines.<br /><span>One vision.</span></Heading>
      <div className="company-discipline-grid"><article className="company-discipline-dark"><div className="company-card-label"><span>01 / DIGITAL CRAFT</span><ArrowUpRight size={22} /></div><h3>Software &amp;<br /><em>technology.</em></h3><p>We build digital products and technology that help businesses operate, grow, and evolve.</p><ul>{['Websites & apps', 'Custom software', 'SaaS & products', 'E-commerce', 'AI & automation', 'Cloud solutions'].map(text => <li key={text}>{text}</li>)}</ul><Link className="company-text-link" href="/services">Explore technology <ArrowUpRight size={16} /></Link></article><article><div className="company-card-label"><span>02 / BRAND BUILDING</span><ArrowUpRight size={22} /></div><h3>Branding &amp;<br /><em>growth.</em></h3><p>We help businesses find their voice, build recognition, and reach the right people.</p><ul>{['Brand strategy', 'Identity & design', 'Content & film', 'Social media', 'SEO & GEO', 'Lead generation'].map(text => <li key={text}>{text}</li>)}</ul><Link className="company-text-link" href="/branding">Explore branding <ArrowUpRight size={16} /></Link></article></div>
    </section>

    <section className="company-section company-process">
      <Label left="03 — HOW WE WORK" right="THOUGHTFUL AT EVERY STEP" />
      <Heading note="We look beyond what needs to be made and focus on what will make a meaningful difference.">We think beyond<br /><span>the deliverable.</span></Heading>
      <div className="company-process-grid">{[['Understand', 'We learn about your business, challenges, audience, and goals before recommending a solution.'], ['Strategise', 'We find the right direction, define the scope, and make a practical plan.'], ['Build', 'We combine technology, creativity, and execution to bring the idea to life.'], ['Evolve', 'We support, improve, and help you build on what has been created.']].map(([title, description], index) => <article key={title}><span>0{index + 1}</span><div className="company-process-track" /><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="company-section company-people" id="company-people">
      <Label left="04 — THE PEOPLE BEHIND HYNOX" right="GOOD THINGS ARE MADE TOGETHER" />
      <Heading note="Developers, designers, creative thinkers, and problem-solvers come together to turn ideas into meaningful solutions.">Different minds.<br /><span>One vision.</span></Heading>
      <div className="company-monogram" aria-label="HYNOX team: one team, many perspectives"><span>H<i aria-hidden="true">✳</i></span><small>A TEAM OF IDEAS AND INTENT</small></div><div className="company-people-caption"><span>ONE CONNECTED TEAM</span><span>TECHNOLOGY · DESIGN · STRATEGY · CREATIVE PRODUCTION</span></div>
    </section>

    <section className="company-section company-philosophy">
      <span className="company-small">OUR PHILOSOPHY — 05</span>
      <h2>Technology should <em>solve.</em><br />Brands should <em>connect.</em><br />Ideas should move <span>forward.</span></h2>
      <div className="company-philosophy-bottom"><span aria-hidden="true">✳</span><p>Good technology makes businesses better. Good branding makes them memorable.<br />Together, they create room for lasting growth.</p><small>HYNOX / EST. WITH INTENT</small></div>
    </section>

    <section className="company-section company-values">
      <Label left="06 — WHY HYNOX" right="BUILT AROUND YOUR BUSINESS" />
      <Heading>More than a service.<br /><span>A team in your corner.</span></Heading>
      <div className="company-values-list">{[['Technology & creativity under one roof', 'We bring software development and brand-building together for connected solutions.'], ['Business-first thinking', 'We understand the challenge before choosing the technology or creative direction.'], ['Practical execution', 'Ideas matter when they are thoughtfully planned, built, and delivered.'], ['Built for evolution', 'We create solutions that can improve as your business develops.']].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={19} aria-hidden="true" /></article>)}</div>
    </section>

    <section className="company-section company-selected">
      <Label left="07 — SELECTED WORK" right="MADE WITH INTENTION" />
      <Heading>Ideas brought<br /><span>to life.</span></Heading>
      <div className="company-selected-intro"><p>Digital platforms, business software, and online stores<br />made with our clients.</p><Link href="/work" className="company-text-link">Explore all works <ArrowUpRight size={15} /></Link></div>
      <div className="company-work-grid">{[{ name: 'Aharraa', image: '/aharraa_web.png', width: 1901, height: 859, type: 'BUSINESS WEBSITE · FOOD & HOSPITALITY' }, { name: 'Graaps UK', image: '/graaps_web.png', width: 2940, height: 1678, type: 'SHOPIFY · E-COMMERCE' }, { name: 'JP Interiors App', image: '/JpApp_works.png', width: 3840, height: 2160, type: 'MOBILE APP · CUSTOM SOFTWARE' }].map(project => <Link href="/work" className={`company-work-card${project.name === 'Aharraa' ? ' company-work-card-aharraa' : ''}`} key={project.name}><div><Image src={project.image} alt={`${project.name} project by HYNOX`} width={project.width} height={project.height} sizes="(max-width:620px) 88vw, 40vw" /></div><h3>{project.name}</h3><p>{project.type}</p></Link>)}</div>
    </section>

    <section className="company-section company-team">
      <Label left="08 — THE PEOPLE BEHIND HYNOX" right="ONE TEAM, MANY PERSPECTIVES" />
      <Heading note="Meet the people bringing thoughtful technology and creative ideas to life.">Good work is<br /><span>made together.</span></Heading>
      <div className="company-team-grid">{team.map(([name, role], index) => <article key={name}><div className="company-team-photo"><Image src={`/company-reference/team-0${index + 1}.jpg`} alt={`Illustrative sample portrait for ${role}`} width={616} height={720} sizes="(max-width:620px) 44vw, 27vw" /><span>SAMPLE PROFILE</span></div><div className="company-team-caption"><h3>{name}</h3><span>{role}</span></div></article>)}</div>
      <p className="company-team-note">Demo names and AI-generated sample portraits from the reference — replace with real team details and photos.</p>
    </section>
  </div>
}

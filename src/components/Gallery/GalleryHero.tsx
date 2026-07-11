export default function GalleryHero() {
  return (
    <section className="gallery-hero" aria-labelledby="gallery-heading">
      <div className="gallery-shell">
        <p className="gallery-eyebrow">Project Gallery</p>
        <h1 id="gallery-heading">Quality Work Across Residential and Commercial Properties</h1>
        <p className="gallery-hero__copy">Explore completed repairs, maintenance projects, facility improvements, and property upgrades delivered by JBTRADESMENLLC across residential, commercial, and property-management environments.</p>
        <ul className="gallery-hero__trust" aria-label="Company qualifications and service areas">
          <li>Residential &amp; Commercial</li><li>Licensed &amp; Insured</li><li>OSHA 30</li><li>Colorado • Wyoming • Nevada</li>
        </ul>
        <p className="gallery-hero__note">Every project reflects professional planning, clear communication, jobsite documentation, and attention to long-term performance.</p>
      </div>
    </section>
  )
}

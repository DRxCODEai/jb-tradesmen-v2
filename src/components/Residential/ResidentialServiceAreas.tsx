import { MapPin } from 'lucide-react'
import './ResidentialServiceAreas.css'

const areas = [
  { state: 'Colorado', cities: ['Fort Collins', 'Loveland', 'Windsor', 'Greeley', 'Timnath', 'Wellington'] },
  { state: 'Wyoming', cities: ['Cheyenne', 'Laramie'] },
  { state: 'Nevada', cities: ['Las Vegas', 'Henderson', 'Summerlin', 'Paradise', 'North Las Vegas'] },
]

export default function ResidentialServiceAreas() {
  return (
    <section className="residential-areas" aria-labelledby="residential-areas-title">
      <div className="residential-areas__inner">
        <header className="residential-areas__heading">
          <span>Where we work</span>
          <h2 id="residential-areas-title">Serving Homeowners Across Colorado, Wyoming &amp; Nevada</h2>
        </header>
        <div className="residential-areas__grid">
          {areas.map(({ state, cities }) => (
            <article className="residential-areas__card" key={state}>
              <MapPin size={27} aria-hidden="true" />
              <h3>{state}</h3>
              <div>{cities.map((city) => <span key={city}>{city}</span>)}</div>
            </article>
          ))}
        </div>
        <p className="residential-areas__note">We also serve additional surrounding communities. Contact our team to confirm service availability in your area.</p>
      </div>
    </section>
  )
}

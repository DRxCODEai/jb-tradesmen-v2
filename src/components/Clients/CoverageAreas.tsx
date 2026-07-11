import { MapPin } from 'lucide-react'
import './CoverageAreas.css'
const states=['Colorado','Wyoming','Nevada']
export default function CoverageAreas(){return <section className="clients-coverage" aria-labelledby="clients-coverage-title"><div className="clients-coverage__inner"><header className="clients-coverage__heading"><span>Regional support</span><h2 id="clients-coverage-title">Proudly Serving</h2></header><div className="clients-coverage__grid">{states.map(state=><article className="clients-coverage__card" key={state}><MapPin size={30} aria-hidden="true"/><h3>{state}</h3></article>)}</div><p>We also support surrounding communities and regional commercial clients across the Rocky Mountain region.</p></div></section>}

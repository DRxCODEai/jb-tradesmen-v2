import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './CommercialFAQ.css'

const questions=[
  ['Do you offer emergency commercial repairs?','Yes. Contact us for urgent repair needs and our team will respond as quickly as possible based on availability and the nature of the issue.'],
  ['Can you provide recurring maintenance?','Yes. We can support planned preventative maintenance and ongoing facility service programs tailored to your property needs.'],
  ['Do you service multiple properties?','Yes. We work with property managers, businesses, and organizations that need dependable support across multiple sites.'],
  ['Are you licensed and insured?','Yes. JBTRADESMENLLC is licensed and insured, with a team committed to safe, professional workmanship.'],
  ['Do you work after business hours?','We work with you to coordinate service timing that helps minimize disruption to your customers, tenants, and daily operations.'],
  ['Can you service government facilities?','Yes. We provide support for government facilities and are experienced working in professional, regulated environments.'],
]

export default function CommercialFAQ(){const [openIndex,setOpenIndex]=useState<number|null>(0);return <section className="commercial-faq" aria-labelledby="commercial-faq-title"><div className="commercial-faq__inner"><header className="commercial-faq__heading"><span>Helpful answers</span><h2 id="commercial-faq-title">Frequently Asked Questions</h2></header><div className="commercial-faq__list">{questions.map(([question,answer],index)=>{const isOpen=openIndex===index;return <article className={`commercial-faq__item${isOpen?' is-open':''}`} key={question}><h3><button type="button" aria-expanded={isOpen} onClick={()=>setOpenIndex(isOpen?null:index)}>{question}<ChevronDown size={21} aria-hidden="true"/></button></h3><div className="commercial-faq__answer"><p>{answer}</p></div></article>})}</div></div></section>}

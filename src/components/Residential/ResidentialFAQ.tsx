import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './ResidentialFAQ.css'

const questions = [
  ['Do you offer free estimates?', 'We provide clear project assessments and pricing before work begins. Contact us with your project details to discuss the best next step.'],
  ['Are you licensed and insured?', 'Yes. JBTRADESMENLLC is licensed and insured, and our team is committed to safe, professional workmanship.'],
  ['Do you warranty your work?', 'Most completed work is supported by our 12-month workmanship warranty, so you can move forward with confidence.'],
  ['How quickly can you schedule?', 'Scheduling depends on the scope of your project and current availability. We communicate promptly and work to schedule service as quickly as possible.'],
  ['What payment methods do you accept?', 'Our team will explain available payment options and project terms before service begins.'],
  ['Do you provide emergency repairs?', 'Yes. Contact us for urgent repair needs, and we will respond as quickly as possible based on availability and the nature of the issue.'],
]

export default function ResidentialFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="residential-faq" aria-labelledby="residential-faq-title">
      <div className="residential-faq__inner">
        <header className="residential-faq__heading">
          <span>Helpful answers</span>
          <h2 id="residential-faq-title">Frequently Asked Questions</h2>
        </header>
        <div className="residential-faq__list">
          {questions.map(([question, answer], index) => {
            const isOpen = openIndex === index
            return (
              <article className={`residential-faq__item${isOpen ? ' is-open' : ''}`} key={question}>
                <h3>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)}>
                    {question}<ChevronDown size={21} aria-hidden="true" />
                  </button>
                </h3>
                <div className="residential-faq__answer"><p>{answer}</p></div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

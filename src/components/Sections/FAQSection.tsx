import './FAQSection.css';

const faqs = [
  {
    question: 'Do you provide free estimates?',
    answer:
      'Yes. Standard project estimates are free. We also offer detailed Professional Property Assessment Reports for clients who require comprehensive documentation.'
  },
  {
    question: 'What is included in a Property Assessment Report?',
    answer:
      'Each report includes photographs, repair recommendations, maintenance priorities, estimated costs and a professionally formatted PDF.'
  },
  {
    question: 'Do you work with commercial properties?',
    answer:
      'Absolutely. We work with commercial facilities, retail locations, banks, property managers and government agencies.'
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Yes. JBTRADESMENLLC is fully insured and maintains OSHA 30, EPA 608, EPA 609 and Federal Contractor registrations.'
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We currently serve Colorado, Wyoming and Nevada with expanding commercial service coverage.'
  }
];

export default function FAQSection() {
  return (
    <section className="faq-section">

      <div className="faq-container">

        <span className="section-tag">
          FREQUENTLY ASKED QUESTIONS
        </span>

        <h2>
          Questions We Hear Most Often
        </h2>

        <div className="faq-grid">

          {faqs.map((faq) => (

            <div
              key={faq.question}
              className="faq-card"
            >

              <h3>{faq.question}</h3>

              <p>{faq.answer}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
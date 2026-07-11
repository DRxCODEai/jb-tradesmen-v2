import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import ContactSuccess from './ContactSuccess'

const customerTypes = ['Homeowner', 'Property Manager', 'Commercial Facility', 'Business Owner', 'Government Agency', 'Tenant', 'Other']
const services = ['Residential Repair', 'Commercial Maintenance', 'Property Assessment', 'Emergency Repair', 'Plumbing', 'Electrical', 'HVAC', 'Drywall and Painting', 'Flooring', 'Appliance Repair', 'Kitchen or Bathroom Remodeling', 'Tenant Improvement', 'Preventative Maintenance', 'General Service Request', 'Other']
const states = ['Nevada', 'Wyoming', 'Colorado', 'Other']
const contactMethods = ['Phone', 'Email', 'Text Message']
const urgencies = ['Standard Service', 'Within One Week', 'Within 24–48 Hours', 'Emergency or After Hours', 'Planning for a Future Project']

function SelectField({ id, label, options, onChange }: { id: string; label: string; options: string[]; onChange?: (value: string) => void }) {
  return (
    <div className="contact-field">
      <label htmlFor={id}>{label} <span aria-hidden="true">*</span></label>
      <select id={id} name={id} required defaultValue="" onChange={(event) => onChange?.(event.target.value)}>
        <option value="" disabled>Select an option</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
}

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xwvgevyn')
  const [selectedState, setSelectedState] = useState('')

  return (
    <section className="contact-form-section" aria-labelledby="service-request-heading">
      <div className="contact-shell contact-form-section__layout">
        <div className="contact-form-section__intro">
          <p className="contact-eyebrow">Tell us how we can help</p>
          <h2 id="service-request-heading">Send a service request</h2>
          <p>Share the essential details about your property or project. Our team will review your request and help determine the right next step.</p>
          <div className="contact-form-section__notice">
            <strong>Current service area</strong>
            <span>Colorado, Wyoming, and Nevada</span>
          </div>
        </div>

        <div className="contact-form-card">
          {state.succeeded ? <ContactSuccess /> : (
            <form onSubmit={handleSubmit} aria-live="polite">
              <input type="hidden" name="_subject" value="New JBTRADESMENLLC Website Contact Request" />
              <input type="hidden" name="submissionSource" value="JBTRADESMENLLC Contact Page" />

              <fieldset>
                <legend>Customer information</legend>
                <div className="contact-form-grid">
                  <div className="contact-field">
                    <label htmlFor="firstName">First Name <span aria-hidden="true">*</span></label>
                    <input id="firstName" name="firstName" required autoComplete="given-name" />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="lastName">Last Name <span aria-hidden="true">*</span></label>
                    <input id="lastName" name="lastName" required autoComplete="family-name" />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="email">Email Address <span aria-hidden="true">*</span></label>
                    <input id="email" name="email" type="email" required autoComplete="email" aria-describedby="email-error" />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="phone">Phone Number <span aria-hidden="true">*</span></label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" />
                  </div>
                  <div className="contact-field contact-field--full">
                    <label htmlFor="companyOrProperty">Company or Property Name <span className="contact-optional">Optional</span></label>
                    <input id="companyOrProperty" name="companyOrProperty" autoComplete="organization" />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Project information</legend>
                <div className="contact-form-grid">
                  <SelectField id="customerType" label="Customer Type" options={customerTypes} />
                  <SelectField id="serviceNeeded" label="Service Needed" options={services} />
                  <div className="contact-field">
                    <label htmlFor="city">Property City <span aria-hidden="true">*</span></label>
                    <input id="city" name="city" required autoComplete="address-level2" />
                  </div>
                  <SelectField id="state" label="Property State" options={states} onChange={setSelectedState} />
                  {selectedState === 'Other' && (
                    <p className="contact-area-alert contact-field--full" role="status">Service availability outside Colorado, Wyoming, and Nevada will require confirmation. You may still submit your request.</p>
                  )}
                  <div className="contact-field">
                    <label htmlFor="zipCode">ZIP Code <span aria-hidden="true">*</span></label>
                    <input id="zipCode" name="zipCode" required autoComplete="postal-code" inputMode="numeric" />
                  </div>
                  <SelectField id="preferredContactMethod" label="Preferred Contact Method" options={contactMethods} />
                  <SelectField id="urgency" label="Project Urgency" options={urgencies} />
                  <div className="contact-field contact-field--full">
                    <label htmlFor="message">Project Description <span aria-hidden="true">*</span></label>
                    <textarea id="message" name="message" required rows={7} aria-describedby="message-help" placeholder="Describe the property, repair, maintenance issue, or project. Include dimensions, quantities, visible damage, access concerns, or scheduling needs when known." />
                    <ValidationError prefix="Project description" field="message" errors={state.errors} />
                  </div>
                </div>
              </fieldset>

              <label className="contact-consent" htmlFor="contactConsent">
                <input id="contactConsent" name="contactConsent" type="checkbox" required value="Yes" />
                <span>I consent to being contacted by JBTRADESMENLLC regarding this service request. <span aria-hidden="true">*</span></span>
              </label>
              <p className="contact-privacy">Your information will only be used to respond to your service request.</p>
              <div className="contact-form-error"><ValidationError errors={state.errors} /></div>
              <button className="contact-button contact-button--gold contact-submit" type="submit" disabled={state.submitting}>
                {state.submitting ? 'Sending Request…' : 'Send Service Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

import EstimateHero from '../components/Sections/EstimateHero';
import AssessmentReport from '../components/Sections/AssessmentReport';
import WhyChooseUs from '../components/Sections/WhyChooseUs.tsx';
import ProfessionalCredentials from '../components/Sections/ProfessionalCredentials';
import ProcessTimeline from '../components/Sections/ProcessTimeline';
import IndustriesGrid from '../components/Sections/IndustriesGrid';
import FAQSection from '../components/Sections/FAQSection';
import CTASection from '../components/Sections/CTASection';

export default function RequestEstimate() {
  return (
    <>
      <EstimateHero />

      <AssessmentReport />

      <WhyChooseUs />

      <ProfessionalCredentials />

      <ProcessTimeline />

      <IndustriesGrid />

      <FAQSection />


      <CTASection />
    </>
  );
}
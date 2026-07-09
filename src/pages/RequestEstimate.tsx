import EstimateHero from '../components/Sections/EstimateHero';
import AssessmentReport from '../components/Sections/AssessmentReport';
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
      <ProfessionalCredentials />
      <ProcessTimeline />
      <IndustriesGrid />
      <FAQSection />
      import FeaturedProjects from '../components/Sections/FeaturedProjects';
      <CTASection />
    </>
  );
}
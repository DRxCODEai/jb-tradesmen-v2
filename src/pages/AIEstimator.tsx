import { useEffect } from 'react';
import SmartEstimator from '../components/SmartEstimator/SmartEstimator';

export default function AIEstimator() {
  useEffect(() => { document.title = 'Smart Project Estimator | JBTRADESMENLLC'; }, []);
  return <SmartEstimator />;
}

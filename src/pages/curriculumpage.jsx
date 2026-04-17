import { useState } from 'react';
import HeaderSection from '@/Components/layoutss/code-headers';
import Footer from '@/Components/layoutss/newFooter';
import CurriculumHero from '@/Components/curriculum/curriculumHero';
import PathwayCards from '@/Components/curriculum/pathwaycards';
import CurriculumTabs from '@/Components/curriculum/curriculumTabs';
import PricingComparison from '@/Components/curriculum/pricingcomparison';
import CurriculumCTA from '@/Components/curriculum/curriculumCTA';

export default function CurriculumPage() {
  const [selectedPathway, setSelectedPathway] = useState('explorer');

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      <main>
        <CurriculumHero />
        <PathwayCards selectedPathway={selectedPathway} setSelectedPathway={setSelectedPathway} />
        <CurriculumTabs id="curriculum-tab" selectedPathway={selectedPathway} setSelectedPathway={setSelectedPathway} />
        <PricingComparison />
        <CurriculumCTA />
      </main>
      <Footer />
    </div>
  );
}

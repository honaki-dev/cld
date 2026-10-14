import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import ScamTypesSection from "./sections/ScamTypesSection";
import GuideSection from "./sections/GuideSection";
import CaseStudySection from "./sections/CaseStudySection";
import ChecklistSection from "./sections/ChecklistSection";
import CtaSection from "./sections/CtaSection";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <StatsSection />
            <ScamTypesSection />
            <GuideSection />
            <CaseStudySection />
            <ChecklistSection />
            <CtaSection />
        </>
    );
}


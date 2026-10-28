import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
// Sections retained as code but omitted from the current PDF-led page:
// import { ClientMarquee } from "@/components/sections/client-marquee";
// import { About } from "@/components/sections/about";
// import { TravelLayer } from "@/components/travel-cards/travel-layer";
// import { CtaBand } from "@/components/sections/cta-band";
// import { Work } from "@/components/sections/work";
import { Founders } from "@/components/sections/founders";
// import { Expertise } from "@/components/sections/expertise";
// import { Industries } from "@/components/sections/industries";
// import { Approach } from "@/components/sections/approach";
// import { Media } from "@/components/sections/media";
// import { FounderVoice } from "@/components/sections/founder-voice";
import { Milestones } from "@/components/sections/milestones";
// import { TeamWhy } from "@/components/sections/team-why";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";
import { ValueProposition } from "@/components/sections/value-proposition";
import { CiniMini } from "@/components/sections/cini-mini";
import { FlagshipBanner } from "@/components/sections/flagship-banner";
import { CalendarSponsors } from "@/components/sections/calendar-sponsors";
import { RameshPortfolio } from "@/components/sections/ramesh-portfolio";
import { StudioCaseStudy } from "@/components/sections/studio-case-study";
import { BrandIntegrations } from "@/components/sections/brand-integrations";
// import { DigitalCommerce } from "@/components/sections/digital-commerce";
import { ShowreelExperience } from "@/components/sections/showreel-experience";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <ShowreelExperience>
          <Hero />
        </ShowreelExperience>
        {/* Omitted per the PDF: standalone About and client-logo marquee sections. */}
        {/* <About /> */}
        {/* <TravelLayer /> */}
        {/* <ClientMarquee /> */}
        <ValueProposition />
        <RameshPortfolio />
        <FlagshipBanner />
        <CiniMini />
        <CalendarSponsors />
        <StudioCaseStudy />
        <Founders />
        {/* The Sripada Studios Journey (milestones), restored after the founders. */}
        <Milestones />
        {/* <Work /> */}
        {/* Omitted per the PDF: standalone services, industries, and process sections. */}
        {/* <Expertise /> */}
        {/* <Industries /> */}
        {/* <Approach /> */}
        {/* Omitted per the PDF: media showcase, founder quote, CTA band, and team section. */}
        {/* <Media /> */}
        {/* <FounderVoice /> */}
        {/* <CtaBand /> */}
        {/* <TeamWhy /> */}
        <BrandIntegrations />
        {/* Removed: internal e-commerce requirements list. */}
        {/* <DigitalCommerce /> */}
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { About } from "@/components/sections/about";
import { TravelLayer } from "@/components/travel-cards/travel-layer";
import { CtaBand } from "@/components/sections/cta-band";
import { Work } from "@/components/sections/work";
import { Expertise } from "@/components/sections/expertise";
import { Founders } from "@/components/sections/founders";
import { Industries } from "@/components/sections/industries";
import { Approach } from "@/components/sections/approach";
import { Media } from "@/components/sections/media";
import { FounderVoice } from "@/components/sections/founder-voice";
import { Milestones } from "@/components/sections/milestones";
import { TeamWhy } from "@/components/sections/team-why";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero + About share one positioned box so the fan cards can travel into the collage. */}
        <div className="relative overflow-x-clip">
          <Hero />
          <About />
          <TravelLayer />
        </div>
        <Founders />
        <ClientMarquee />
        <Expertise />
        <Industries />
        <Work />
        <Approach />
        <Media />
        <FounderVoice />
        <Milestones />
        <CtaBand />
        <TeamWhy />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

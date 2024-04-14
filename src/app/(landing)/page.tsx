import HeroLanding from "@/components/ui/commons/HeroLanding";
import AffiliateHandler from "@/components/core/AffiliateHandler";
import CTAOffer from "@/components/ui/commons/CTAOffer";
import TestimonialMultiple from "./ui/TestimonialMultiple";

export default function LandingPage({
  searchParams,
}: {
  searchParams: {
    aff: string;
  };
}) {
  return (
    <div className="bg-sky-950">
      <HeroLanding />
      <div className="bg-white flex">
        <div className="hidden lg:flex   mx-auto">
          <TestimonialMultiple />
        </div>
      </div> 
      <div>
        <div className="  mx-auto">
          <CTAOffer />
        </div>
      </div>{" "}
  
       
      <AffiliateHandler aff={searchParams.aff} currentUser={null} />
    </div>
  );
}

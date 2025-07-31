import { AboutTheCompany } from "./ui/about-the-company/about-the-company";
import { BlackBlock } from "./ui/black-block/black-block";
import { CarouselBG } from "./ui/carousels/carousel-bg/carousel-bg";
import { CarouselCategories } from "./ui/carousels/carousel-categories";
import { CarouselProjects } from "./ui/carousels/carousel-projects";
import { CarouselTechnique } from "./ui/carousels/carousel-technique";
import { Map } from "./ui/map/map";
import { SectionPriceAddition } from "./ui/section-price-addition/section-price-addition";
import { SectionReliability } from "./ui/section-relibability/section-relibability";

export default async function Page() {
  return (
    <div className="flex flex-col justify-center items-center  bg-[#f1f1f1] gap-16 w-full">
      <CarouselBG />
      <CarouselCategories />
      <SectionReliability />
      <BlackBlock />
      <CarouselProjects />
      <CarouselTechnique />
      <SectionPriceAddition />
      <AboutTheCompany />
      <Map />
    </div>
  );
}

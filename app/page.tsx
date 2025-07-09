import { fetchCompletedProjects } from "./api/projects/queries";
import { Carousel } from "./ui/carousels/carousel";
import { CarouselCategories } from "./ui/carousels/carousel-categories";
import { SectionRelibability } from "./ui/section-relibability/section-relibability";

export default async function Page() {
  const projects = await fetchCompletedProjects();

  return (
    <div className="flex flex-col justify-center items-center  bg-[#f1f1f1] gap-16 w-full">
      <Carousel />
      <CarouselCategories />
      <SectionRelibability />
    </div>
  );
}

import { fetchCompletedProjects } from "./api/projects/queries";
import { Carousel } from "./ui/carousels/carousel";
import { CarouselCategories } from "./ui/carousels/carousel-categories";

export default async function Page() {
  const projects = await fetchCompletedProjects();
  return (
    <div className="flex flex-col justify-center items-center max-w-screen-xl bg-white">
      <Carousel />
      <CarouselCategories />
    </div>
  );
}

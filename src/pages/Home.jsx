import Contact from "@/components/Contact";
import FeaturedWork from "@/components/FeaturedWork";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import { Separator } from "@/components/ui/separator";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  return null;
};

export default function Home() {
  return (
    <div className="container mx-auto">
      <Hero />
      <TechStack />
      <FeaturedWork />
      <Separator className="my-8" />
      <Contact />
    </div>
  );
}

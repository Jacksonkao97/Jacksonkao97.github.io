import Hero from "@/components/Hero";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  return null;
};

export default function Home() {
  return (
    <div className="container mx-auto">
      <Hero />
    </div>
  );
}

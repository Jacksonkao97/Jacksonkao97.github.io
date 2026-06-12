import { Separator } from "@/components/ui/separator";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return null;
}

export default function About() {
  return (
    <div className="container mx-auto flex flex-col bg-transparent px-4 py-6 sm:px-0 md:flex-row md:py-24">
      <div className="flex w-full max-w-1/5 flex-col">
        {/* <div className="aspect-square w-full bg-[url(assets/images/profile_picture.jpeg)] mask-[url(assets/images/masking_image.jpg)] bg-contain bg-no-repeat" /> */}
        <img
          src="assets/images/profile_picture.jpeg"
          alt="profile picture"
          className="aspect-square mask-radial-[50%_50%] mask-radial-from-10% object-contain"
        />
      </div>

      <Separator orientation="vertical" className="mx-4 hidden md:block" />

      <div className="flex flex-col"></div>
    </div>
  );
}

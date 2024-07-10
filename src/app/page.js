import Popular from "@/components/popular";
import Genres from "@/components/genres";

export const revalidate = 86400;

export default function Home() {
  return (
    <div className="w-full max-w-screen-xl px-4">
      <Popular  />
      <Genres />
    </div>
  );
}
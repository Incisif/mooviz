import Popular from "@/components/popular";

export const revalidate = 86400;

export default function Home() {
  return (
    <div className="w-full max-w-screen-xl px-4">
      <Popular  />
    </div>
  );
}
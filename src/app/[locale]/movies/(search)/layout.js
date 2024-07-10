import SearchSideBar from "@/components/search-sidebar";
import { getMovieByPath } from "@/utils/movieClient";

export default async function MovieSarchLayout({ children, params }) {
  const { genres } = await getMovieByPath("/genre/movie/list");
  return (
    <section className="mt-8 flex w-full max-w-screen-xl px-4">
      <SearchSideBar genres={genres} locale={params.locale}/>
      {children}
    </section>
  );
}

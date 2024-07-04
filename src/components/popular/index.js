import { getMovieByPath } from "@/utils/movieClient";
import MediaCard from "@/components/media-card";

const Popular = async () => {
  const { results } = await getMovieByPath("/movie/popular");
  const popularMovies = results.slice(0, 6);
  return (
    <div>
      <div className="flex items-center">
        <div className="mr-2 h-8 w-1 bg-[var(--secondaryColor)]"></div>
        <h2 className="py-4 font-sans text-3xl font-bold">
          Les plus populaires
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-6 xl:gap-4">
        {popularMovies.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
    </div>
  );
};

export default Popular;

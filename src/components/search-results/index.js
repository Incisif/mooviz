import { getMovieByPath } from "@/utils/movieClient";
import MediaCard from "@/components/media-card";

const SearchResults = async ({ searchParams, genreId, locale }) => {

  const { results } = await getMovieByPath("/discover/movie", [
    { key: "sort_by", value: searchParams.sort_by },
    {
      key: "primary_release_date.gte",
      value: searchParams["primary_release_date.gte"],
    },
    {
      key: "primary_release_date.lte",
      value: searchParams["primary_release_date.lte"],
    },
    { key: "with_genres", value: genreId },
  ]);

  return (
    <div className="mt-[52px] grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {results
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <MediaCard media={movie} key={movie.id} locale={locale} />
        ))}
    </div>
  );
};

export default SearchResults;

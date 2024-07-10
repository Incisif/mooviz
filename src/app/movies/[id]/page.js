import { getMovieByPath } from "@/utils/movieClient";
import { notFound } from "next/navigation";
import MovieDetails from "@/components/movie-details";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function MovieIdPage({ params: { id, locale } }) {
  const [movie, trailerData] = await Promise.all([
    getMovieByPath(`/movie/${id}`, [], locale),
    getMovieByPath(`/movie/${id}/videos`),
  ]);

  if (!movie.original_title) {
    return notFound();
  }

  const trailer = trailerData.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const trailerKey = trailer ? trailer.key : null;

  return (
    <div>
      <MovieDetails movie={movie} trailerKey={trailerKey} locale={locale} />
    </div>
  );
}

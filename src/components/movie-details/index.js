import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import formatRuntime from "@/utils/format-runtime"
import formatBudget from "@/utils/format-budget";
import MovieCredits from "@/components/movie-credits";
import { Suspense } from "react";
import { getMovieByPath } from "@/utils/movieClient";
import NoTrailerAvailable from "@/components/no-trailer-available";
import Similar from "@/components/similar";
import { getDictionary } from "@/utils/dictionaries";

const MovieDetails = async ({ movie, trailerKey, locale }) => {
  const { crew } = await getMovieByPath(`/movie/${movie.id}/credits`);
  const director = crew.filter((person) => person.job === "Director");
  const writers = crew.filter((person) => person.job === "Writer");
  const producers = crew.filter((person) => person.job === "Producer");
  const { results } = await getMovieByPath(`/movie/${movie.id}/similar`);
  const i18n = await getDictionary(locale);

  return (
    <>
      <div className="relative flex min-h-[60vh] w-screen  justify-center overflow-hidden px-6 text-white">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/original/${movie.backdrop_path}`}
          alt={movie.title}
          fill
          priority={true}
          className="h-[40vw] scale-150 object-cover blur-2xl "
        />
        <div className="absolute size-full bg-black opacity-70"></div>
        <div className="flex w-full max-w-screen-xl ">
          <div className="z-10 w-full py-8">
            <div className="flex justify-between">
              <div>
                <h1 className="text-4xl font-bold ">{movie.title}</h1>
                <p className="text-sm">
                  {i18n.movieDetails.originalTitle} {movie.original_title}
                </p>
              </div>
              <div>
                <p className="text-center text-sm font-thin text-slate-400">
                  NOTE
                </p>
                <div className="flex items-center gap-2 ">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-600" />
                  <p className="font-bold">
                    {movie.vote_average.toFixed(1)}
                    <span className="align-top text-sm font-thin text-slate-400">
                      /10
                    </span>
                  </p>
                  <p>({movie.vote_count})</p>
                </div>
              </div>
            </div>
            <div className="mb-4 flex items-center ">
              <p className="text-sm">
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
              <p className="px-2">|</p>
              <p className="text-sm">{formatRuntime(movie.runtime)}</p>
            </div>
            <div className="flex max-h-[380px] gap-4">
              <div className="">
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w342/${movie.poster_path}`}
                  alt={movie.title}
                  width={278}
                  height={414}
                  className="aspect-[1/1.41] object-cover"
                />
              </div>
              <div className="w-4/5">
                {trailerKey ? (
                  <iframe
                    title="Trailer"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    allowFullScreen
                    className="aspect-video    "
                  ></iframe>
                ) : (
                  <NoTrailerAvailable locale={locale} />
                )}
              </div>
            </div>
            <div className="my-4 flex gap-2">
              {movie.genres.map((genre) => (
                <div
                  className="group relative z-10 overflow-hidden rounded-3xl"
                  key={genre.name}
                >
                  <div className="absolute inset-0 z-[-1] size-full bg-slate-100 opacity-0 group-hover:opacity-30 group-hover:backdrop-blur-lg "></div>
                  <div className="cursor-pointer  rounded-2xl border border-slate-400 bg-transparent px-1 text-sm font-thin text-slate-200 transition-colors duration-300 ease-in-out">
                    {genre.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-2xl font-bold">Synopsis</h2>
                <p>{movie.overview}</p>
              </div>
              <div>
                <div className="">
                  {director.map((director) => (
                    <p key={director.id}>
                      <span className="font-bold">
                        {i18n.movieDetails.direction}
                      </span>{" "}
                      {director.name}
                    </p>
                  ))}
                </div>
                <div>
                  {writers.length > 0 && (
                    <>
                      <span className="font-bold">
                        {i18n.movieDetails.screenwriter}{" "}
                      </span>
                      {writers.map((writer, index) => (
                        <span key={writer.id}>
                          {writer.name}
                          {index < writers.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </>
                  )}
                </div>
                <div>
                  {producers.length > 0 && (
                    <>
                      <span className="font-bold">
                        {i18n.movieDetails.producer}{" "}
                      </span>
                      {producers.map((producer, index) => (
                        <span key={producer.id}>
                          {producer.name}
                          {index < producers.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </>
                  )}
                </div>
                <div>
                  {movie.budget > 0 && (
                    <div>
                      <span className="font-bold">Budget</span>{" "}
                      <span>{formatBudget(movie.budget)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="flex w-full justify-center px-4 ">
        <div className=" mb-8 w-full max-w-screen-xl font-sans ">
          <Suspense fallback={<div>Loading...</div>}>
            <MovieCredits movieId={movie.id} locale={locale} />
          </Suspense>
        </div>
      </section>
      {results && results.length > 0 ? (
        <section className="mx-auto mb-8 max-w-screen-xl font-sans">
          <div className="w-full">
            <div className="flex items-center">
              <div className="mr-2 h-8 w-1 bg-yellow-500"></div>
              <h2 className="my-8 text-2xl font-bold">{i18n.similar.title}</h2>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Similar movies={results} locale={locale} />
            </Suspense>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default MovieDetails;

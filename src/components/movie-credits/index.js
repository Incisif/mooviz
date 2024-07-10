import Image from "next/image";
import { getDictionary } from "@/utils/dictionaries";
import { getMovieByPath } from "@/utils/movieClient";

const MovieCredits = async ({ movieId, locale }) => {
  const { cast } = await getMovieByPath(`/movie/${movieId}/credits`);

  const i18n = await getDictionary(locale);

  return (
    <div>
      <div className="flex items-center">
            <div className="mr-2 h-8 w-1 bg-[var(--secondaryColor)]"></div>
            <h2 className="my-8 text-2xl font-bold">{i18n.movieCredits.cast}</h2>
          </div>
      <div className="grid grid-cols-2 gap-4 ">
        {cast
          .slice(0, 12)
          .filter((person) => person.profile_path)
          .map((person, index) => (
            <div
              className={`mb-4 flex h-24 ${
                index % 2 === 0 ? "order-1" : "order-2"
              }`}
              key={person.id}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w185${person.profile_path}`}
                alt={person.name}
                width={120}
                height={120}
                className="h-full w-24 rounded-full object-cover"
              />
              <div className="ml-4 flex flex-col justify-center">
                <p className="font-bold">{person.name}</p>
                <p className="text-zinc-400">{person.character}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieCredits;

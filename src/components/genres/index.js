import { getMovieByPath } from "@/utils/movieClient";
import Link from "next/link";

const Genres = async () => {
  const { genres } = await getMovieByPath("/genre/movie/list");
  return (
    <div className=" w-full">
      <h2 className="my-8 text-2xl font-bold">Parcourir par genres</h2>
      <div className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <div
            className="ease w-[45%] cursor-pointer rounded-lg bg-zinc-800 py-1 text-center text-lg font-bold text-white transition-all duration-300 hover:bg-zinc-600 sm:w-[30%] lg:w-[15%] xl:w-[12%]"
            key={genre.id}
          >
            <Link href={`/movies/genres/${genre.id}`}>
              <p>{genre.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;

import Link from "next/link";
import Image from "next/image";

function MovieSearchResults({ movieResults }) {
  return (
      <div className="absolute right-10 top-20 z-10 max-h-[834px] max-w-[300px] overflow-auto bg-white p-2 shadow-sm">
        {movieResults.map((movie) => (
          <div key={movie.id}>
            <Link href={`/movies/${movie.id}`}className="flex items-center gap-2 border-b-2 py-2 hover:bg-gray-100">
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500${movie.backdrop_path}`}
                alt={`${movie.title}`}
                width={90}
                height={50}
                className="shadow-lg"
              ></Image>
              <p className="font-montserrat text-sm text-gray-600 ">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
  );
}

export default MovieSearchResults;

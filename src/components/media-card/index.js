import Image from "next/image";
import Link from "next/link";

const MediaCard = ({ mediaId }) => {
  return (
    <div className="w-full min-w-48 font-montserrat shadow-xl transition  duration-300 hover:shadow-2xl">
      <Link href={`/movies/${mediaId}`}>
        <div className="relative  aspect-[1/1.41] w-full overflow-hidden  bg-zinc-200">
          <Image
            src="https://image.tmdb.org/t/p/w500/hYQs5RPHiWctoYqvI8baHiIqdd8.jpg"
            alt="media title"
            fill
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-wrap pb-2 text-sm leading-tight">Creed III</h3>
          <p className="mt-auto pb-2 text-xs font-light">Le 01/03/2023</p>
        </div>
      </Link>
    </div>
  );
};

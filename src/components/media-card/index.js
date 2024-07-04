import Image from "next/image";
import Link from "next/link";

const MediaCard = ({ media }) => {
  return (
    <div className="w-full min-w-48 font-montserrat shadow-xl transition  duration-300 hover:shadow-2xl">
      <Link href={`/movies/${media.id}`}>
        <div className="relative  aspect-[1/1.41] w-full overflow-hidden  bg-zinc-200">
        <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500${media.poster_path}`}
            alt={media.title}
            style={{ objectFit: "cover" }}
            fill="responsive"
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

export default MediaCard;

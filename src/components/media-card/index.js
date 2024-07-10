"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Like from "./like";


function MediaCard({ media, locale, isLiked }) {
  const voteAverageRound = Math.round(media.vote_average * 10) / 10;

  return (
    <div className="w-full min-w-48 font-montserrat shadow-xl transition  duration-300 hover:shadow-2xl">
      <Link href={`/${locale}/movies/${media.id}`}>
        <div className="relative  aspect-[1/1.41] w-full overflow-hidden  bg-zinc-200">
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500${media.poster_path}`}
            alt={media.title}
            style={{ objectFit: "cover" }}
            fill="responsive"
          />
          <Like mediaId={media.id} isLiked={isLiked} />
        </div>
        <div className="flex h-28 w-full flex-col px-4">
          <div className="mt-2 flex items-center gap-2 pb-3 text-sm">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
            <div className="flex w-full justify-between">
              <p>{voteAverageRound}</p>
              <p>({media.vote_count})</p>
            </div>
          </div>
          <h3 className="text-wrap pb-2 text-sm leading-tight">
            {media.title}
          </h3>
          <p className="mt-auto pb-2 text-xs font-light">
            {new Date(media.release_date).toLocaleDateString("fr-FR")}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default MediaCard;

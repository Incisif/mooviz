"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn } from "next-auth/react";
import { useLike } from "@/context/likedMovieContext";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

const Like = ({ mediaId }) => {
  const { data: session } = useSession();

  const { likedMovies, setLikedMovies } = useLike();

  const router = useRouter();

  const isLiked = useMemo(
    () => likedMovies.includes(parseInt(mediaId)),
    [likedMovies, mediaId]
  );

  const handleLikeCliked = async (e) => {
    e.preventDefault();
    if (!session) {
      signIn();
    }

    const methode = isLiked ? "DELETE" : "POST";
    const response = await fetch(`/api/like/${mediaId}`, {
      method: methode,
    });
    if (response.ok) {
      if (isLiked) {
        setLikedMovies(likedMovies.filter((id) => id !== parseInt(mediaId)));
        router.refresh();
      } else {
        setLikedMovies([...likedMovies, parseInt(mediaId)]);
      }
    } else {
      console.error("Failed to update like status");
    }
  };
  return (
    <button
      onClick={handleLikeCliked}
      className="group absolute left-2 top-0 z-40 rounded-b-md bg-zinc-300 px-3 py-2 
      "
    >
      <FontAwesomeIcon
        icon={faHeart}
        className={` transition-colors duration-300 group-hover:text-red-600 ${
          isLiked ? "text-red-600" : "text-white"
        }`}
      />
    </button>
  );
};

export default Like;

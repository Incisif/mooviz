"use client";

import { useState } from "react";
import MediaCard from "@/components/media-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Similar = ({ movies, locale }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTranslateX(translateX + 100);
    }
  };

  const handleNext = () => {
    if (currentIndex < movies.length - 4) {
      setCurrentIndex(currentIndex + 1);
      setTranslateX(translateX - 100);
    }
  };

  return (
    <div className="mb-8 flex w-screen max-w-screen-xl flex-col items-center ">
      <div className="relative w-2/3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="group absolute -left-8 top-1/2 z-10 rounded-sm border border-gray-800 bg-zinc-400 p-4 duration-300 ease-in-out hover:bg-zinc-600 "
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="group-hover:text-white"
          />
        </button>
        <div className="overflow-x-hidden">
          <div
            className="flex w-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {movies.map((movie, index) => (
              <div className="shrink-0 grow-0 basis-1/4 p-1" key={movie.id}>
                <MediaCard media={movie} locale={locale} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex >= movies.length / 4 - 1}
          className="group absolute -right-10 top-1/2 z-10 rounded-sm border border-gray-800 bg-gray-400 p-4 duration-300 ease-in-out hover:bg-zinc-600 "
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="group-hover:text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default Similar;

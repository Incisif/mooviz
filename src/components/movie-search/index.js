"use client";

import { DebounceInput } from "react-debounce-input";
import { useState, useRef } from "react";
import MovieSearchResults from "@/components/movie-search-results";

const MovieSearch = () => {
  const [movieResults, setMovieResults] = useState([]);
  const [hasFocus, setHasFocus] = useState(false);
  const blurTimeout = useRef(null);

  const upDateMovieSearch = async (query) => {
    const response = await fetch(`/api/movies/search?query=${query}`);
    const { results } = await response.json();

    setMovieResults(results.filter((movie) => movie.backdrop_path));
  };

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => setHasFocus(false), 100);
  };

  const handleFocus = () => {
    clearTimeout(blurTimeout.current);
    setHasFocus(true);
  };

  return (
    <div>
      <DebounceInput
        placeholder="Search for a movie"
        minLength={2}
        debounceTimeout={500}
        onChange={(e) => upDateMovieSearch(e.target.value)}
        className="h-6  min-w-72 rounded-sm p-2 text-zinc-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {hasFocus && movieResults.length > 0 && (
        <MovieSearchResults movieResults={movieResults} />
      )}
    </div>
  );
};

export default MovieSearch;

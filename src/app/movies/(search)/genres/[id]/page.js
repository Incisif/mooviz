import React from "react";
import SearchResults from "@/components/search-results";

const GenreIdPage = ({ params, searchParams }) => {
  return <SearchResults searchParams={searchParams} genreId={params.id} />;
};

export default GenreIdPage;
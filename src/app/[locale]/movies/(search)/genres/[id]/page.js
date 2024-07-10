import React from "react";
import SearchResults from "@/components/search-results";

const GenreIdPage = ({ params, searchParams }) => {
  return (
    <div>
      <SearchResults
        searchParams={searchParams}
        genreId={params.id}
        locale={params.locale}
      />
    </div>
  );
};

export default GenreIdPage;

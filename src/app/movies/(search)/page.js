import SearchResults from "@/components/search-results";

export default function MoviesPage({ searchParams, params }) {
  return <SearchResults searchParams={searchParams} locale={params.locale} />;
}

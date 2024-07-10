"use client";

import { useSelectedLayoutSegment, useParams, notFound } from "next/navigation";
import Form from "./form";

const SearchSideBar = ({ genres }) => {
  const segment = useSelectedLayoutSegment();
  const { id } = useParams();

  const getSidebarTitle = () => {
    if (!segment) {
      return "Films";
    }
    const genre = genres.find((genre) => genre.id === Number(id));
    if (!genre) {
      return notFound();
    }

    return genre.name;
  };
  const title = getSidebarTitle();
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-1 bg-[var(--secondaryColor)]"></div>
        <h1 className="py-4 font-sans text-3xl font-bold text-zinc-800">
          {title}
        </h1>
      </div>
      <Form />
    </div>
  );
};

export default SearchSideBar;

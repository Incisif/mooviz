"use client";

import { useRouter, usePathname } from "next/navigation";

function Form() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const fromDate = formData.get("fromDate");
    const toDate = formData.get("toDate");
    const sort = formData.get("sort");

    const searchParms = new URLSearchParams();
    if (fromDate) searchParms.append("primary_release_date.gte", fromDate);
    if (toDate) searchParms.append("primary_release_date.lte", toDate);
    if (sort) searchParms.append("sort_by", sort);

    router.push(`${pathname}?${searchParms.toString()}`);
  };

  return (
    <form className="rounded-sm bg-white p-4 shadow-md" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-2xl font-bold">Filtres</h2>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Date de sortie</h3>

        <div className="mb-4 flex items-center">
          <p className="mr-2">Du</p>
          <input
            type="date"
            name="fromDate"
            className="w-full rounded-sm border p-2"
          />
        </div>

        <div className="mb-4 flex items-center">
          <p className="mr-2">au</p>
          <input
            type="date"
            name="toDate"
            defaultValue={new Date().toISOString().substring(0, 10)}
            className="w-full rounded-sm border p-2"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Trier par</h3>
        <select name="sort" className="w-full rounded-sm border p-2">
          <option value="popularity.desc">Popularité</option>
          <option value="note_average.desc">Note</option>
          <option value="vote_count.desc">Nombre de note</option>
        </select>
      </div>

      <input
        type="submit"
        value="Rechercher"
        className="w-full cursor-pointer rounded-sm bg-yellow-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-yellow-600"
      />
    </form>
  );
}

export default Form;

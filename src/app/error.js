"use client";

import { useEffect } from "react";

export default function RootError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[90vh] w-full flex-col items-center justify-center font-montserrat text-red-600">
      <h1 className="text-5xl font-bold">Erreur</h1>
      <h2>Quelque chose c&lsquo;est mal passé !</h2>
      <button
        className="m-4 rounded bg-red-600 p-2 text-white"
        onClick={() => reset()}
      >
        Réessayez !
      </button>
    </div>
  );
}

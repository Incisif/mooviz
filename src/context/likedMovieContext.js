"use client";

// Importations nécessaires
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";

// Création du contexte
const LikedMovieContext = createContext();

// Hook personnalisé pour utiliser le contexte
export function useLike() {
  return useContext(LikedMovieContext);
}

// Composant fournisseur de contexte
export function LikedMovieProvider({ children }) {
  const [likedMovies, setLikedMovies] = useState([]);
  const { data: session } = useSession();

  // Charger les films aimés pour l'utilisateur connecté
  useEffect(() => {
    async function loadInitialMovies() {
      if (!session) return;
      try {
        const response = await fetch(`/api/like/liked-movies`);
        const initialMovies = await response.json();
        const moviesAsInt = initialMovies.map((id) => parseInt(id));
        setLikedMovies(moviesAsInt);
      } catch (error) {
        console.error("Failed to fetch initial movies", error);
      }
    }

    loadInitialMovies();
  }, [session]); // Dépendance à userId

  // Mémoire pour le contexte
  const value = useMemo(
    () => ({
      likedMovies,
      setLikedMovies,
    }),
    [likedMovies, setLikedMovies]
  );

  // Retour du fournisseur de contexte
  return (
    <LikedMovieContext.Provider value={value}>
      {children}
    </LikedMovieContext.Provider>
  );
}

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MovieSearch from "@/components/movie-search";
import LanguageSelector from "@/components/language-selector";
import Link from "next/link";
import { getDictionary } from "@/utils/dictionaries";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/logout-button"

export default function Header({ locale }) {
  const [i18n, setI18n] = useState({});
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const loadDictionary = async () => {
      const dictionary = await getDictionary(locale);
      setI18n(dictionary);
    };
    loadDictionary();
  }, [locale]);

  const createLocalizedPath = (path) => `/${locale}${path}`;

  const handleProfileClick = (e) => {
    e.preventDefault();
    const profilePath = createLocalizedPath("/user/profile");
    router.push(profilePath);
    router.refresh(); // Forcer le rafraîchissement
  };

  return (
    <header className="z-50 flex w-full items-center bg-zinc-800 p-4 font-sans text-white">
      <div className="mx-auto flex w-full max-w-screen-xl items-center">
        <div>
          <Link href="/">
            <div className="flex items-center text-xl font-bold">
              Moov
              <span className="rounded-sm bg-[var(--secondaryColor)] pr-2 text-zinc-900">
                iz
              </span>
            </div>
          </Link>
        </div>
        <div className="flex grow basis-1/2 justify-end">
          <nav>
            <ul className="flex gap-4 pr-8">
              <li>
                <Link href={createLocalizedPath("/series")}>
                  <p>{i18n.header?.series}</p>
                </Link>
              </li>
              <li>
                <Link href={createLocalizedPath("/movies")}>
                  <p>{i18n.header?.movies}</p>
                </Link>
              </li>
              {!session ? (
                <li className="rounded bg-zinc-600 px-1  text-white duration-300 hover:bg-[var(--secondaryColor)] hover:text-zinc-800">
                  <Link href={createLocalizedPath("/signup")}>
                    <p>{i18n.header?.signup}</p>
                  </Link>
                </li>
              ) : (
                <li>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </nav>
        </div>
        <MovieSearch />
        <div className="pl-4">
          <button href="#" onClick={handleProfileClick}>
            <p>
              <FontAwesomeIcon icon={faUser} />
            </p>
          </button>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
}

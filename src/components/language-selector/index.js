"use client";

import { availableLocales } from "@/utils/i18n";
import { useEffect, useState } from "react";
import { useCurrentLanguage } from "@/hooks/useCurrentLanguage";
import Link from "next/link";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = useCurrentLanguage();

  useEffect(() => {
    setIsOpen(false);
  }, [currentLanguage]);

  const createLocalizedURL = (locale) => {
    return `/${locale}`;
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen((currOpen) => !currOpen)}
        className="relative pl-2 font-semibold"
      >
        {currentLanguage.toUpperCase()}
        <span>
          <FontAwesomeIcon
            icon={faChevronCircleDown}
            className={`${
              isOpen ? "rotate-180 duration-300" : "duration-300"
            } ml-2`}
          />
        </span>
      </button>
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } group absolute z-10 mt-2 rounded-sm border border-gray-200 bg-white p-2 shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-500 `}
      >
        {availableLocales
          .filter((locale) => locale !== currentLanguage)
          .map((locale) => (
            <li key={locale} className="border-b text-zinc-800 last:border-b-0">
              <Link href={createLocalizedURL(locale)}>
                <p className="block px-2 py-1 group-hover:text-white">
                  {locale.toUpperCase()}
                </p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;

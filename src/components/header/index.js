import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Header = () => {
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
      </div>
      <div className="flex grow basis-1/2 justify-end">
        <nav>
          <ul>
            <li>
              <Link href="/series">Séries</Link>
            </li>
            <li>
              <Link href="/movies">Films</Link>
            </li>
          </ul>
        </nav>
        <input
          type="text"
          placeholder="Rechercher un titre ..."
          className="h-6  min-w-72 rounded-sm p-2 text-zinc-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </header>
  );
};

export default Header;
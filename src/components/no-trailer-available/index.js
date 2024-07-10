import { getDictionary } from "@/utils/dictionaries"

const NoTrailerAvailable = async ({locale}) => {

  const i18n = await getDictionary(locale);
    return (
      <div className="flex h-full items-center justify-center bg-zinc-800 text-white">
        <p>{i18n.movieDetails.noTrailer}</p>
      </div>
    );
  };
  
  export default NoTrailerAvailable;
  
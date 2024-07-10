import { getServerSession } from "next-auth";
import prisma from "@/utils/prisma";
import { getHydratedMovie } from "@/utils/movieClient";
import MediaCard from "@/components/media-card";
import { getDictionary } from "@/utils/dictionaries";

const ProfilePage = async ({ params: { locale } }) => {
    const i18n = await getDictionary(locale);
    const { user: userSession } = await getServerSession();
  
    const { movieLikes } = await prisma.user.findFirst({
      where: {
        email: userSession.email,
      },
      include: {
        movieLikes: true,
      },
    });
    const movies = await getHydratedMovie(
      movieLikes.map((like) => like.movieId),
      locale
    );
  
    return (
      <div className="w-screen max-w-screen-xl px-4 ">
        <div className="flex items-center ">
          <div className="mr-2 h-8 w-1 bg-[var(--secondaryColor)]"></div>
          <h2 className="py-4 font-sans text-3xl font-bold">
            {i18n.profile.likedMovies}
          </h2>
        </div>
  
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-6 xl:gap-4">
          {movies.map((movie) => (
            <MediaCard media={movie} key={movie.id} locale={locale} />
          ))}
        </div>
      </div>
    );
  };
  
  export default ProfilePage;

import Header from "@/components/header";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { roboto, montserrat } from "@/fonts";
import { availableLocales } from "@/utils/i18n";
import AuthProvider from "@/components/auth-provider";
import { LikedMovieProvider } from "@/context/likedMovieContext";

export const metadata = {
  title: "Mooviz: votre guide de films et séries",
  description:
    "Mooviz est votre guide pour trouver des films et séries à regarder. Trouvez des films et séries populaires, des recommandations personnalisées et bien plus encore.",
};

export function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${montserrat.variable} bg-gray-100`}>
        <div className="flex min-h-screen flex-col items-center">
          <AuthProvider>
            <LikedMovieProvider>
              <Header locale={params.locale} />
              <main>{children}</main>
            </LikedMovieProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}


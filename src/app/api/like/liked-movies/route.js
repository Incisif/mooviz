import prisma from "@/utils/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = await getToken({ req });

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Non autorisé" }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const likes = await prisma.movieLike.findMany({
      where: {
        userId: parseInt(token.sub, 10),
      },
      select: {
        movieId: true,
      },
    });
    return new NextResponse(JSON.stringify(likes.map((like) => like.movieId)), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des likes:", error);
    return new NextResponse(JSON.stringify({ message: "Erreur interne du serveur" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// pages/api/like/[movieId].js

import prisma from "@/utils/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req, { params: { movieId } }) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const userId = parseInt(token.sub, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ message: "ID utilisateur invalide" }, { status: 400 });
    }

    const like = await prisma.movieLike.create({
      data: {
        movieId,
        userId,
      },
    });

    return NextResponse.json({ message: "Like ajouté", like });
  } catch (error) {
    console.error("Erreur lors de l'ajout du like:", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}

export async function DELETE(req, { params: { movieId } }) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const userId = parseInt(token.sub, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ message: "ID utilisateur invalide" }, { status: 400 });
    }

    const result = await prisma.movieLike.deleteMany({
      where: {
        movieId,
        userId,
      },
    });

    return NextResponse.json({ message: "Like retiré", count: result.count });
  } catch (error) {
    console.error("Erreur lors de la suppression du like:", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}



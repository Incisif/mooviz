import * as bcrypt from "bcrypt";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...rest } = user;
    return NextResponse.json(rest);
  }

  return NextResponse.json(null);
}

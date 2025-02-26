import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    
    const portfolio = await prisma.portfolio.upsert({
      where: {
        userId: userId,
      },
      create: {
        userId: userId,
        name: data.name,
        title: data.title,
        bio: data.bio || "",
        email: data.email,
        location: data.location,
        avatar: data.avatar || "",
        skills: data.skills || [],
        username: data.username,
        projects: {
          create: data.projects.map((project: any) => ({
            title: project.title,
            description: project.description,
            image: project.image,
            technologies: project.technologies || [],
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            order: project.order
          }))
        },
        socialLinks: {
          create: data.socialLinks
        }
      },
      update: {
        name: data.name,
        title: data.title,
        bio: data.bio || "",
        email: data.email,
        location: data.location,
        avatar: data.avatar || "",
        skills: data.skills || [],
        username: data.username,
        projects: {
          deleteMany: {},
          create: data.projects.map((project: any) => ({
            title: project.title,
            description: project.description,
            image: project.image,
            technologies: project.technologies || [],
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            order: project.order
          }))
        },
        socialLinks: {
          upsert: {
            create: data.socialLinks,
            update: data.socialLinks,
          }
        }
      },
      include: {
        projects: true,
        socialLinks: true
      }
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Portfolio creation error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const userId = searchParams.get("userId");

    if (!username && !userId) {
      return new NextResponse("Username or userId is required", { status: 400 });
    }

    const portfolio = await prisma.portfolio.findFirst({
      where: {
        OR: [
          { username: username || undefined },
          { userId: userId || undefined },
        ],
      },
      include: {
        projects: {
          orderBy: {
            order: 'asc',
          },
        },
        socialLinks: true,
      },
    });

    if (!portfolio) {
      return new NextResponse("Portfolio not found", { status: 404 });
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.portfolio.delete({
      where: {
        userId: userId,
      },
    });

    return new NextResponse("Portfolio deleted", { status: 200 });
  } catch (error) {
    console.error("Portfolio deletion error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
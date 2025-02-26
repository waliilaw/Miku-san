import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { userId } = await auth()
    const portfolio = await prisma.portfolio.findFirst({
      where: { username: params.username },
      include: {
        projects: {
          orderBy: { order: 'asc' }
        },
        socialLinks: true
      }
    })

    if (!portfolio) {
      return new NextResponse("Portfolio not found", { status: 404 })
    }

    if (portfolio.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await req.json()
    const username = await params.username
    
    const portfolio = await prisma.portfolio.findFirst({
      where: { username }
    })

    if (!portfolio || portfolio.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: {
        name: data.name,
        title: data.title,
        bio: data.bio || "",
        email: data.email,
        location: data.location,
        avatar: data.avatar || "",
        skills: data.skills || [],
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
          update: {
            github: data.socialLinks.github,
            twitter: data.socialLinks.twitter,
            linkedin: data.socialLinks.linkedin
          }
        }
      },
      include: {
        projects: true,
        socialLinks: true
      }
    })

    return NextResponse.json(updatedPortfolio)
  } catch (error) {
    console.error("Portfolio update error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 
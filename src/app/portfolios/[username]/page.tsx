import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { EditButton } from "@/components/edit-button";
import { DeletePortfolioDialog } from "@/components/delete-portfolio-dialog";

export default async function PortfolioPage({
  params: { username }
}: {
  params: { username: string }
}) {
  try {
    const { userId } = await auth();
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        username: username,
      },
      include: {
        projects: {
          orderBy: {
            order: 'asc'
          }
        },
        socialLinks: true
      }
    });

    if (!portfolio) {
      return notFound();
    }

    const isOwner = userId === portfolio.userId;

    return (
      <div className="min-h-screen bg-black text-white p-8">
        {isOwner && (
          <div className="fixed bottom-4 right-4 flex space-x-4">
            <EditButton username={username} />
            <DeletePortfolioDialog username={username} />
          </div>
        )}
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <img 
              src={portfolio.avatar || '/miku.jpg'} 
              alt={portfolio.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#39c5bb] to-pink-400 text-transparent bg-clip-text">
              {portfolio.name}
            </h1>
            <p className="text-xl text-gray-400 mt-2">{portfolio.title}</p>
            <p className="mt-4 text-gray-300">{portfolio.bio}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#39c5bb] text-black px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.projects.map((project: any) => (
                <div key={project.title} className="border border-[#39c5bb]/20 rounded-lg p-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <div className="space-y-2 text-gray-300">
              <p>📧 {portfolio.email}</p>
              <p>📍 {portfolio.location}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return notFound();
  }
}

"use client"

import { useEffect, useState } from "react"

// Define the type for portfolio data
interface PortfolioData {
  avatar: string;
  name: string;
  title: string;
  email: string;
  location: string;
  availability: string;
  skills: string[];
  socialLinks: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("portfolioData") || "null")
    setPortfolioData(data)
  }, [])

  if (!portfolioData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="text-center">
        <img src={portfolioData.avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto" />
        <h1 className="text-4xl font-bold">{portfolioData.name}</h1>
        <p className="text-xl">{portfolioData.title}</p>
        <div className="mt-4">
          {portfolioData.skills.map(skill => (
            <span key={skill} className="bg-[#39c5bb] text-black rounded-full px-3 py-1 mx-1">
              {skill}
            </span>
          ))}
        </div>
        <button
          className="mt-6 bg-[#39c5bb] text-black px-4 py-2 rounded"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          Share Portfolio
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Contact Info</h2>
        <p>{portfolioData.email}</p>
        <p>{portfolioData.location}</p>
        <p>{portfolioData.availability}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Social Links</h2>
        <div className="flex space-x-4">
          {portfolioData.socialLinks.github && (
            <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {portfolioData.socialLinks.twitter && (
            <a href={portfolioData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          )}
          {portfolioData.socialLinks.linkedin && (
            <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile-form"
import { ProjectsForm } from "@/components/projects-form"
import { SkillsForm } from "@/components/skills-form"
import { SocialForm } from "@/components/social-form"
import { ThemeForm } from "@/components/theme-form"
import { SignedIn, SignedOut, RedirectToSignIn, UserButton, SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useUser } from "@clerk/nextjs"
import { Project } from "@prisma/client"
import { Toaster } from 'react-hot-toast'
import Loading from "@/components/Loading"

function CreatePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [step, setStep] = useState("profile")
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [avatar, setAvatar] = useState("")
  const [skills, setSkills] = useState([])
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [socialLinks, setSocialLinks] = useState({})
  const [bio, setBio] = useState("")
  const [projects, setProjects] = useState<{
    title: string;
    id: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string | null;
    githubUrl: string | null;
    portfolioId: string;
    order: number;
  }[]>([])
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkExistingPortfolio = async () => {
      if (!isLoaded || !user) {
        router.push('/sign-in')
        return
      }

      try {
        // Get username from user object
        const username = user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || `user-${user.id}`
        
        // Check if portfolio exists
        const response = await fetch(`/api/portfolios/${username}`)
        
        if (response.ok) {
          toast.success("Redirecting to edit page...")
          router.push(`/portfolios/${username}/edit`)
          return
        }
        
        setChecking(false)
      } catch (error) {
        console.error("Error checking portfolio:", error)
        setChecking(false)
      }
    }

    checkExistingPortfolio()
  }, [isLoaded, user, router])

  const handleSubmit = async () => {
    if (!name || !title || !email || !location) {
      toast.error("Please fill in all required fields.")
      return
    }

    if (!user?.id) {
      toast.error("Please sign in to create a portfolio")
      return
    }

    // Use email as username if username is not set
    const username = user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || `user-${user.id}`

    const portfolioData = {
      name,
      title,
      avatar,
      skills,
      email,
      location,
      socialLinks,
      bio,
      projects,
      userId: user.id,
      username: username,
    }

    try {
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      })

      if (response.ok) {
        toast.success("Portfolio created successfully!")
        router.push(`/portfolios/${username}`)
      } else {
        const error = await response.json()
        toast.error(error.message)
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("Failed to create portfolio")
    }
  }

  if (checking) {
    return <div><Loading /></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black ">
      <Toaster position="top-center" />
      <SignedIn >
      <Button onClick={() => router.push('/')} className="mb-4">
        Go Back to Home
      </Button>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Create Your Portfolio</h1>
            <p className="text-gray-400">Express yourself through a beautiful and professional portfolio</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Tabs value={step} onValueChange={setStep}>
              <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto">
                <TabsTrigger value="profile" className="data-[state=active]:bg-[#39c5bb] data-[state=active]:text-black">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-[#39c5bb] data-[state=active]:text-black">
                  Skills
                </TabsTrigger>
                <TabsTrigger value="projects" className="data-[state=active]:bg-[#39c5bb] data-[state=active]:text-black">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-[#39c5bb] data-[state=active]:text-black">
                  Social
                </TabsTrigger>
              </TabsList>
              <Card className="mt-6 p-6 bg-black/50 border-[#39c5bb]/20">
                <TabsContent value="profile">
                  <ProfileForm 
                    setName={setName} 
                    setTitle={setTitle} 
                    setAvatar={setAvatar} 
                    setBio={setBio}
                    name={name} 
                    title={title} 
                    bio={bio}
                    email={email} 
                    location={location} 
                    setEmail={setEmail} 
                    setLocation={setLocation} 
                  />
                </TabsContent>
                <TabsContent value="skills">
                  <SkillsForm 
                    skills={skills}
                    setSkills={setSkills as React.Dispatch<React.SetStateAction<string[]>>}
                  />
                </TabsContent>
                <TabsContent value="projects">
                  <ProjectsForm 
                    projects={projects}
                    setProjects={setProjects as React.Dispatch<React.SetStateAction<{
                      title: string;
                      id: string;
                      description: string;
                      image: string;
                      technologies: string[];
                      liveUrl: string | null;
                      githubUrl: string | null;
                      portfolioId: string;
                      order: number;
                    }[]>>}
                  />
                </TabsContent>
                <TabsContent value="social">
                  <SocialForm 
                    socialLinks={socialLinks}
                    setSocialLinks={setSocialLinks}
                  />
                </TabsContent>
              </Card>
            </Tabs>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  const steps = ["profile", "skills", "projects", "social"]
                  const currentIndex = steps.indexOf(step)
                  if (currentIndex > 0) {
                    setStep(steps[currentIndex - 1])
                  }
                }}
                disabled={step === "profile"}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  const steps = ["profile", "skills", "projects", "social"]
                  const currentIndex = steps.indexOf(step)
                  if (currentIndex < steps.length - 1) {
                    setStep(steps[currentIndex + 1])
                  }
                }}
                disabled={step === "social" || !name || !title || !email || !location}
              >
                Next
              </Button>
            </div>
            <div className="flex justify-center mt-6">
  <Button 
    onClick={handleSubmit} 
    className="bg-[#39c5bb] hover:bg-[#39c5bb]/80 text-black px-8 py-2"
  >
    Create Portfolio
  </Button>
</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-2">
        <UserButton />
      </div>
      </SignedIn>
      <SignedOut>
<RedirectToSignIn/>
      </SignedOut>
    </div>
  )
}

export default CreatePage;


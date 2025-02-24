"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile-form"
import { ProjectsForm } from "@/components/projects-form"
import { SkillsForm } from "@/components/skills-form"
import { SocialForm } from "@/components/social-form"
import { ThemeForm } from "@/components/theme-form"

export default function CreatePage() {
  const [step, setStep] = useState("profile")
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [avatar, setAvatar] = useState("")
  const [skills, ] = useState([])
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [socialLinks, ] = useState({})
  const [bio, ] = useState("")

  const handleSubmit = async () => {
    if (!name || !title || !email || !location) {
      alert("Please fill in all required fields.");
      return;
    }

    const portfolioData = {
      name,
      title,
      avatar,
      skills,
      email,
      location,
      socialLinks,
      userId: "1902", // Replace with actual user ID
      bio,
    };

    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(portfolioData),
    });

    if (response.ok) {
      window.location.href = "/portfolio"; // Redirect to the portfolio page
    } else {
      const errorData = await response.json();
      alert(`Failed to create portfolio: ${errorData.error}`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Create Your Portfolio</h1>
          <p className="text-gray-400">Express yourself through a beautiful and professional portfolio</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={step} onValueChange={setStep}>
            <TabsList className="grid grid-cols-5 gap-4 bg-transparent h-auto">
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
              <TabsTrigger value="theme" className="data-[state=active]:bg-[#39c5bb] data-[state=active]:text-black">
                Theme
              </TabsTrigger>
            </TabsList>
            <Card className="mt-6 p-6 bg-black/50 border-[#39c5bb]/20">
              <TabsContent value="profile">
                <ProfileForm 
                  setName={setName} 
                  setTitle={setTitle} 
                  setAvatar={setAvatar} 
                  name={name} 
                  title={title} 
                  email={email} 
                  location={location} 
                  setEmail={setEmail} 
                  setLocation={setLocation} 
                />
              </TabsContent>
              <TabsContent value="skills">
                <SkillsForm />
              </TabsContent>
              <TabsContent value="projects">
                <ProjectsForm />
              </TabsContent>
              <TabsContent value="social">
                <SocialForm />
              </TabsContent>
              <TabsContent value="theme">
                <ThemeForm />
              </TabsContent>
            </Card>
          </Tabs>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => {
                const steps = ["profile", "skills", "projects", "social", "theme"]
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
                const steps = ["profile", "skills", "projects", "social", "theme"]
                const currentIndex = steps.indexOf(step)
                if (currentIndex < steps.length - 1) {
                  setStep(steps[currentIndex + 1])
                }
              }}
              disabled={step === "theme"}
            >
              Next
            </Button>
          </div>
        </div>
        <Button onClick={handleSubmit}>Create Portfolio</Button>
      </div>
    </div>
  )
}


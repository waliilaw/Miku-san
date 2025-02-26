"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { toast } from "react-hot-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile-form"
import { ProjectsForm } from "@/components/projects-form"
import { SkillsForm } from "@/components/skills-form"
import { SocialForm } from "@/components/social-form"
import { ThemeForm } from "@/components/theme-form"
import { Button } from "@/components/ui/button"

export default function EditPortfolio({ params }: { params: { username: string } }) {
  const router = useRouter()
  const { user } = useUser()
  const [step, setStep] = useState("profile")
  const [loading, setLoading] = useState(true)
  
  // Form states
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [avatar, setAvatar] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [socialLinks, setSocialLinks] = useState<any>({})
  const [bio, setBio] = useState("")
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolios/${params.username}`)
        if (response.ok) {
          const data = await response.json()
          // Populate form states
          setName(data.name)
          setTitle(data.title)
          setAvatar(data.avatar || "")
          setSkills(data.skills || [])
          setEmail(data.email)
          setLocation(data.location)
          setSocialLinks(data.socialLinks || {})
          setBio(data.bio || "")
          setProjects(data.projects || [])
        } else {
          toast.error("Failed to fetch portfolio")
          router.push('/')
        }
      } catch (error) {
        toast.error("Failed to fetch portfolio")
      } finally {
        setLoading(false)
      }
    }
    
    fetchPortfolio()
  }, [params.username])

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/portfolios/${params.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          title,
          avatar,
          skills,
          email,
          location,
          socialLinks,
          bio,
          projects,
        }),
      })

      if (response.ok) {
        toast.success("Portfolio updated successfully!")
        router.push(`/portfolios/${params.username}`)
      } else {
        const error = await response.json()
        toast.error(error.message)
      }
    } catch (error) {
      toast.error("Failed to update portfolio")
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container max-w-5xl py-10">
      <Tabs value={step} onValueChange={setStep}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm
            setName={setName}
            setTitle={setTitle}
            setAvatar={setAvatar}
            setBio={setBio}
            setEmail={setEmail}
            setLocation={setLocation}
            name={name}
            title={title}
            bio={bio}
            email={email}
            location={location}
          />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsForm skills={skills} setSkills={setSkills} />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsForm projects={projects} setProjects={setProjects} />
        </TabsContent>
        <TabsContent value="social">
          <SocialForm socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6 gap-4">
        <Button variant="outline" onClick={() => router.push(`/portfolios/${params.username}`)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-[#39c5bb] hover:bg-[#39c5bb]/80">
          Save Changes
        </Button>
      </div>
    </div>
  )
} 
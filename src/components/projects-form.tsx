"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus } from "lucide-react"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export function ProjectsForm() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project>({
    title: "",
    description: "",
    image: "",
    technologies: [],
    liveUrl: "",
    githubUrl: "",
  })
  const [techInput, setTechInput] = useState("")

  const addTechnology = (tech: string) => {
    if (!currentProject.technologies.includes(tech)) {
      setCurrentProject({
        ...currentProject,
        technologies: [...currentProject.technologies, tech],
      })
    }
    setTechInput("")
  }

  const removeTechnology = (tech: string) => {
    setCurrentProject({
      ...currentProject,
      technologies: currentProject.technologies.filter((t) => t !== tech),
    })
  }

  const addProject = () => {
    if (currentProject.title && currentProject.description) {
      setProjects([...projects, currentProject])
      setCurrentProject({
        title: "",
        description: "",
        image: "",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
      })
    }
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-gray-400">Add your notable projects to showcase your work</p>
      </div>

      <Card className="p-4 space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={currentProject.title}
              onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
              placeholder="Enter project title"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={currentProject.description}
              onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
              placeholder="Describe your project"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <Label>Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add a technology..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && techInput.trim()) {
                    e.preventDefault()
                    addTechnology(techInput.trim())
                  }
                }}
              />
              <Button onClick={() => techInput.trim() && addTechnology(techInput.trim())}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentProject.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  {tech}
                  <button onClick={() => removeTechnology(tech)} className="hover:bg-background/20 rounded-full p-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Project Image</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                value={currentProject.image}
                onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                placeholder="Enter image URL or upload"
              />
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="liveUrl">Live Demo URL</Label>
              <Input
                id="liveUrl"
                value={currentProject.liveUrl}
                onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                value={currentProject.githubUrl}
                onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>

        <Button onClick={addProject} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </Card>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeProject(index)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


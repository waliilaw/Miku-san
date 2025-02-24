"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const SUGGESTED_SKILLS = [
  "NextJS",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "HTML/CSS",
  "Python",
  "Java",
  "Docker",
  "AWS",
  "Git",
]

export function SkillsForm() {
  const [skills, setSkills] = useState<string[]>([])
  const [input, setInput] = useState("")

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill])
    }
    setInput("")
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Skills & Technologies</h2>
        <p className="text-gray-400">Add your technical skills and technologies you work with</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a skill..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault()
                addSkill(input.trim())
              }
            }}
          />
          <Button onClick={() => input.trim() && addSkill(input.trim())}>Add</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:bg-background/20 rounded-full p-1">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400">Suggested Skills:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => addSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


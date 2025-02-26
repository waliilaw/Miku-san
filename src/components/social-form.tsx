"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Twitter, Linkedin, Instagram, Youtube, Globe } from "lucide-react"

interface SocialLinks {
  github?: string
  twitter?: string
  linkedin?: string
}

export function SocialForm({ socialLinks, setSocialLinks }: { socialLinks: SocialLinks, setSocialLinks: (socialLinks: SocialLinks) => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Social Links</h2>
        <p className="text-gray-400">Add your social media profiles</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>GitHub</Label>
          <Input 
            placeholder="https://github.com/username"
            value={socialLinks.github || ""}
            onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
          />
        </div>
        <div>
          <Label>Twitter</Label>
          <Input 
            placeholder="https://twitter.com/username"
            value={socialLinks.twitter || ""}
            onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
          />
        </div>
        <div>
          <Label>LinkedIn</Label>
          <Input 
            placeholder="https://linkedin.com/in/username"
            value={socialLinks.linkedin || ""}
            onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}


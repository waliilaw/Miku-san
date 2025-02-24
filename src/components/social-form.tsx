"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Twitter, Linkedin, Instagram, Youtube, Globe } from "lucide-react"

export function SocialForm() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Social Links</h2>
        <p className="text-gray-400">Add your social media profiles</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="github" className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </Label>
          <Input id="github" placeholder="https://github.com/username" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </Label>
          <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="twitter" className="flex items-center gap-2">
            <Twitter className="w-4 h-4" />
            Twitter
          </Label>
          <Input id="twitter" placeholder="https://twitter.com/username" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="instagram" className="flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Instagram
          </Label>
          <Input id="instagram" placeholder="https://instagram.com/username" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="youtube" className="flex items-center gap-2">
            <Youtube className="w-4 h-4" />
            YouTube
          </Label>
          <Input id="youtube" placeholder="https://youtube.com/@username" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Personal Website
          </Label>
          <Input id="website" placeholder="https://yourwebsite.com" />
        </div>
      </div>
    </div>
  )
}


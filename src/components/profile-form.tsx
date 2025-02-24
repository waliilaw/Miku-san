"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"

interface ProfileFormProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  title: string;
  email: string;
  location: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export function ProfileForm({ setName, setTitle, setAvatar, name, title, email, location, setEmail, setLocation }: ProfileFormProps) {
  const [avatar, setLocalAvatar] = useState("")

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setLocalAvatar(data.url)
        setAvatar(data.url)
      } else {
        alert("Image upload failed.")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        <p className="text-gray-400">Add your personal information to your portfolio</p>
      </div>

      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatar} />
          <AvatarFallback>Upload</AvatarFallback>
        </Avatar>
        <Button variant="outline" className="gap-2">
          <Upload className="w-4 h-4" />
          <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
          Upload Avatar
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input id="title" placeholder="e.g. Full Stack Developer" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g. Tokyo, Japan" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
    </div>
  )
}

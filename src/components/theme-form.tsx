"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

const THEMES = [
  {
    name: "Miku Classic",
    primary: "#39c5bb",
    secondary: "#ec4899",
    preview: "bg-gradient-to-r from-[#39c5bb] to-pink-400",
  },
  {
    name: "Cyber Night",
    primary: "#00ff9f",
    secondary: "#00b8ff",
    preview: "bg-gradient-to-r from-[#00ff9f] to-[#00b8ff]",
  },
  {
    name: "Sakura",
    primary: "#ff758f",
    secondary: "#ff7eb3",
    preview: "bg-gradient-to-r from-[#ff758f] to-[#ff7eb3]",
  },
  {
    name: "Ocean Wave",
    primary: "#0ea5e9",
    secondary: "#2dd4bf",
    preview: "bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf]",
  },
]

interface ThemeFormProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export function ThemeForm({ theme, setTheme }: ThemeFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Theme Customization</h2>
        <p className="text-gray-400">Choose a theme for your portfolio</p>
      </div>

      <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-2 gap-4">
        {THEMES.map((themeOption) => (
          <Label key={themeOption.name} className="cursor-pointer">
            <RadioGroupItem value={themeOption.name} className="sr-only" />
            <Card className={`p-4 ${theme === themeOption.name ? "ring-2 ring-primary" : ""}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="font-medium">{themeOption.name}</span>
                {theme === themeOption.name && <Check className="w-4 h-4 text-primary" />}
              </div>
              <div className={`h-20 rounded-lg ${themeOption.preview}`} />
            </Card>
          </Label>
        ))}
      </RadioGroup>

      <div className="pt-4">
        <Button className="w-full">Apply Theme</Button>
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { storage, type User } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AuthPageProps {
  onUserCreated: (user: User) => void
}

export default function AuthPage({ onUserCreated }: AuthPageProps) {
  const [step, setStep] = useState<"basic" | "profile">("basic")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    cityOfBirth: "",
    birthday: "",
    zodiac: "",
    motherTongue: "",
    gender: "",
    currentCity: "",
    school: "",
  })

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.username && formData.email) {
      setStep("profile")
    }
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: User = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      cityOfBirth: formData.cityOfBirth,
      birthday: formData.birthday,
      zodiac: formData.zodiac,
      motherTongue: formData.motherTongue,
      gender: formData.gender,
      currentCity: formData.currentCity,
      school: formData.school,
      avatar: formData.username.charAt(0).toUpperCase(),
    }

    storage.addUser(newUser)
    storage.setCurrentUser(newUser)
    onUserCreated(newUser)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-amber-400 mb-2">TALKSY</h1>
          <p className="text-slate-400">Connect through conversations</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          {step === "basic" ? (
            <form onSubmit={handleBasicSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-50 mb-6">Create Your Account</h2>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold">
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleProfileSubmit} className="space-y-4 max-h-96 overflow-y-auto">
              <h2 className="text-xl font-semibold text-slate-50 mb-6">Complete Your Profile</h2>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  className="w-full bg-slate-800 border border-slate-700 rounded text-slate-50 placeholder-slate-500 p-2 text-sm"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">City of Birth</label>
                <Input
                  type="text"
                  name="cityOfBirth"
                  value={formData.cityOfBirth}
                  onChange={handleChange}
                  placeholder="Your city"
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Birthday</label>
                <Input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="bg-slate-800 border-slate-700 text-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Zodiac</label>
                <Input
                  type="text"
                  name="zodiac"
                  value={formData.zodiac}
                  onChange={handleChange}
                  placeholder="Your zodiac sign"
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Mother Tongue</label>
                <Input
                  type="text"
                  name="motherTongue"
                  value={formData.motherTongue}
                  onChange={handleChange}
                  placeholder="Your language"
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded text-slate-50 p-2"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Current City</label>
                <Input
                  type="text"
                  name="currentCity"
                  value={formData.currentCity}
                  onChange={handleChange}
                  placeholder="Where you live now"
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">School/College</label>
                <Input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="Your school or college"
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder-slate-500"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  onClick={() => setStep("basic")}
                  variant="outline"
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold">
                  Create Account
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

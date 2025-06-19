"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent, role: string) => {
    e.preventDefault()
    console.log("Login attempt:", { ...formData, role })
    // Aquí iría la lógica de autenticación
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">TutoRedAQP</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p className="text-gray-600 mt-2">Accede a tu cuenta para continuar</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="student">Estudiante</TabsTrigger>
            <TabsTrigger value="tutor">Tutor</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Estudiante</CardTitle>
                <CardDescription>Inicia sesión para encontrar tu tutor ideal</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "student")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Correo electrónico</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="student-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Tu contraseña"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Iniciar Sesión
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutor">
            <Card>
              <CardHeader>
                <CardTitle>Tutor</CardTitle>
                <CardDescription>Accede a tu panel de tutor</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "tutor")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tutor-email">Correo electrónico</Label>
                    <Input
                      id="tutor-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tutor-password">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="tutor-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Tu contraseña"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Iniciar Sesión
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/register" className="text-orange-600 hover:underline font-medium">
              Regístrate aquí
            </Link>
          </p>
          <Link href="/auth/forgot-password" className="text-sm text-gray-500 hover:underline mt-2 block">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  )
}

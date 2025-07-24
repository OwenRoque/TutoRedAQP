"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Eye, EyeOff } from "lucide-react"

const universities = [
  "Universidad Nacional de San Agustín (UNSA)",
  "Universidad Católica de Santa María (UCSM)",
  "Universidad Alas Peruanas (UAP)",
  "Universidad Tecnológica del Perú (UTP)",
  "Universidad Continental",
  "Otra",
]

const subjects = [
  "Matemáticas",
  "Física",
  "Química",
  "Biología",
  "Literatura",
  "Historia",
  "Geografía",
  "Inglés",
  "Filosofía",
  "Economía",
  "Psicología",
  "Razonamiento Matemático",
  "Razonamiento Verbal",
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [studentData, setStudentData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    grade: "",
    guardianEmail: "",
    guardianPhone: "",
  })
  const [tutorData, setTutorData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    subjects: [] as string[],
    hourlyRate: "",
  })

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Student registration:", studentData)
    // Aquí iría la lógica de registro
    // Redirigir cuestionario IA
    window.location.href = "/ai-recommendation?newUser=true"
  }

  const handleTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Tutor registration:", tutorData)
    // Aquí iría la lógica de registro
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setTutorData({
        ...tutorData,
        subjects: [...tutorData.subjects, subject],
      })
    } else {
      setTutorData({
        ...tutorData,
        subjects: tutorData.subjects.filter((s) => s !== subject),
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">TutoRedAQP</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Crear Cuenta</h1>
          <p className="text-gray-600 mt-2">Únete a la comunidad educativa de Arequipa</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="student">Estudiante</TabsTrigger>
            <TabsTrigger value="tutor">Tutor</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Estudiante</CardTitle>
                <CardDescription>Crea tu cuenta para encontrar tutores y mejorar tus notas</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Nombre completo</Label>
                      <Input
                        id="student-name"
                        placeholder="Tu nombre completo"
                        value={studentData.name}
                        onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-grade">Grado académico</Label>
                      <Select
                        value={studentData.grade}
                        onValueChange={(value) => setStudentData({ ...studentData, grade: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu grado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-secundaria">1° Secundaria</SelectItem>
                          <SelectItem value="2-secundaria">2° Secundaria</SelectItem>
                          <SelectItem value="3-secundaria">3° Secundaria</SelectItem>
                          <SelectItem value="4-secundaria">4° Secundaria</SelectItem>
                          <SelectItem value="5-secundaria">5° Secundaria</SelectItem>
                          <SelectItem value="preuniversitario">Preuniversitario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardian-email">E-mail Apoderado</Label>
                      <Input
                        id="guardian-email"
                        type="email"
                        placeholder="john.doe@gmail.com"
                        value={studentData.guardianEmail}
                        onChange={(e) => setStudentData({ ...studentData, guardianEmail: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guardian-phone">Teléfono Apoderado</Label>
                      <Input
                          id="guardian-phone"
                          type="tel"
                          value={studentData.guardianPhone}
                          onChange={(e) => setStudentData({ ...studentData, guardianPhone: e.target.value })}
                          required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="student-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 8 caracteres"
                          value={studentData.password}
                          onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
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
                    <div className="space-y-2">
                      <Label htmlFor="student-confirm-password">Confirmar contraseña</Label>
                      <div className="relative">
                        <Input
                          id="student-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirma tu contraseña"
                          value={studentData.confirmPassword}
                          onChange={(e) => setStudentData({ ...studentData, confirmPassword: e.target.value })}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Crear Cuenta de Estudiante
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutor">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Tutor</CardTitle>
                <CardDescription>Únete como tutor y comparte tu conocimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTutorSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tutor-name">Nombre completo</Label>
                      <Input
                        id="tutor-name"
                        placeholder="Tu nombre completo"
                        value={tutorData.name}
                        onChange={(e) => setTutorData({ ...tutorData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tutor-university">Universidad</Label>
                      <Select
                        value={tutorData.university}
                        onValueChange={(value) => setTutorData({ ...tutorData, university: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu universidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {universities.map((uni) => (
                            <SelectItem key={uni} value={uni}>
                              {uni}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tutor-email">Correo electrónico</Label>
                    <Input
                      id="tutor-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={tutorData.email}
                      onChange={(e) => setTutorData({ ...tutorData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tutor-password">Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="tutor-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 8 caracteres"
                          value={tutorData.password}
                          onChange={(e) => setTutorData({ ...tutorData, password: e.target.value })}
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
                    <div className="space-y-2">
                      <Label htmlFor="tutor-confirm-password">Confirmar contraseña</Label>
                      <div className="relative">
                        <Input
                          id="tutor-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirma tu contraseña"
                          value={tutorData.confirmPassword}
                          onChange={(e) => setTutorData({ ...tutorData, confirmPassword: e.target.value })}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Materias que enseñas</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                      {subjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject}
                            checked={tutorData.subjects.includes(subject)}
                            onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                          />
                          <Label htmlFor={subject} className="text-sm">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourly-rate">Tarifa por hora (S/)</Label>
                    <Input
                      id="hourly-rate"
                      type="number"
                      placeholder="25"
                      min="10"
                      max="100"
                      value={tutorData.hourlyRate}
                      onChange={(e) => setTutorData({ ...tutorData, hourlyRate: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Crear Cuenta de Tutor
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/auth/login" className="text-orange-600 hover:underline font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

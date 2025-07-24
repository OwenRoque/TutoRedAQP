"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Star, CheckCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { use } from "react"

// Mock data de la clase completada
const classData = {
  id: "CL-2024-001",
  tutor: {
    name: "María González",
    image: "/placeholder.svg?height=80&width=80",
  },
  date: "Viernes, 15 de Marzo 2024",
  time: "15:00",
  subject: "Matemáticas",
  duration: "1 hora",
}

export default function RatingPage({ params }: { params: Promise<{ classId: string }> }) {
  const classId = use(params)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Rating submitted:", {
      classId: classId,
      rating,
      comment,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Gracias por tu calificación!</h2>
            <p className="text-gray-600 mb-6">
              Tu opinión nos ayuda a mejorar y ayuda a otros estudiantes a encontrar los mejores tutores.
            </p>
            <div className="space-y-2">
              <Link href="/dashboard">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Ver Mis Clases</Button>
              </Link>
              <Link href="/search">
                <Button variant="outline" className="w-full">
                  Buscar Más Tutores
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">TutoRedAQP</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Volver al Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Califica tu Clase</h1>
          <p className="text-gray-600">Comparte tu experiencia para ayudar a otros estudiantes</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Clase</CardTitle>
            <CardDescription>Clase completada el {classData.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src={classData.tutor.image || "/placeholder.svg"}
                alt={classData.tutor.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold text-lg">{classData.tutor.name}</div>
                <div className="text-gray-600">
                  {classData.subject} • {classData.duration}
                </div>
                <div className="text-sm text-gray-500">
                  {classData.date} a las {classData.time}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating con estrellas */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">¿Cómo calificarías esta clase?</h3>
                <div className="flex justify-center space-x-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {rating === 0 && "Selecciona una calificación"}
                  {rating === 1 && "Muy malo"}
                  {rating === 2 && "Malo"}
                  {rating === 3 && "Regular"}
                  {rating === 4 && "Bueno"}
                  {rating === 5 && "Excelente"}
                </div>
              </div>

              {/* Comentario */}
              <div className="space-y-2">
                <label htmlFor="comment" className="text-sm font-medium text-gray-700">
                  Comparte tu experiencia (opcional)
                </label>
                <Textarea
                  id="comment"
                  placeholder="¿Qué te pareció la clase? ¿El tutor explicó bien? ¿Recomendarías a otros estudiantes?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <div className="text-xs text-gray-500">
                  Tu comentario será visible para otros estudiantes y ayudará al tutor a mejorar.
                </div>
              </div>

              {/* Preguntas rápidas */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Ayúdanos con algunas preguntas rápidas:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="punctual" className="rounded" />
                    <label htmlFor="punctual" className="text-gray-700">
                      El tutor fue puntual
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="prepared" className="rounded" />
                    <label htmlFor="prepared" className="text-gray-700">
                      El tutor estaba bien preparado
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="clear" className="rounded" />
                    <label htmlFor="clear" className="text-gray-700">
                      Las explicaciones fueron claras
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="recommend" className="rounded" />
                    <label htmlFor="recommend" className="text-gray-700">
                      Recomendaría este tutor
                    </label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={rating === 0}>
                Enviar Calificación
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Tuviste algún problema con la clase?{" "}
            <Link href="/support" className="text-orange-600 hover:underline">
              Contacta a soporte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

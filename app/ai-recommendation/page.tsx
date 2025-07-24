"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Brain, Star, ArrowRight, Sparkles, User } from "lucide-react"
import Image from "next/image"

const questions = [
  {
    id: 1,
    question: "¿En qué nivel académico te encuentras?",
    options: [
      { value: "1-3-secundaria", label: "1° a 3° de Secundaria" },
      { value: "4-5-secundaria", label: "4° a 5° de Secundaria" },
      { value: "preuniversitario", label: "Preuniversitario" },
    ],
  },
  {
    id: 2,
    question: "¿En qué materia necesitas más ayuda?",
    options: [
      { value: "matematicas", label: "Matemáticas" },
      { value: "ciencias", label: "Ciencias (Física, Química, Biología)" },
      { value: "letras", label: "Letras (Literatura, Historia, Filosofía)" },
      { value: "idiomas", label: "Idiomas (Inglés)" },
      { value: "razonamiento", label: "Razonamiento (Matemático y Verbal)" },
    ],
  },
  {
    id: 3,
    question: "¿Cuál es tu estilo de aprendizaje preferido?",
    options: [
      { value: "visual", label: "Visual - Me gusta ver diagramas y ejemplos gráficos" },
      { value: "practico", label: "Práctico - Aprendo mejor haciendo ejercicios" },
      { value: "teorico", label: "Teórico - Prefiero entender la teoría primero" },
      { value: "interactivo", label: "Interactivo - Me gusta hacer preguntas y discutir" },
    ],
  },
  {
    id: 4,
    question: "¿Qué modalidad prefieres para tus clases?",
    options: [
      { value: "virtual", label: "Virtual - Desde casa" },
      { value: "presencial", label: "Presencial - En persona" },
      { value: "ambas", label: "Ambas modalidades me parecen bien" },
    ],
  },
  {
    id: 5,
    question: "¿Cuáles son tus horarios disponibles?",
    type: "multiple",
    options: [
      { value: "manana", label: "Mañanas (8:00 - 12:00)" },
      { value: "tarde", label: "Tardes (12:00 - 18:00)" },
      { value: "noche", label: "Noches (18:00 - 22:00)" },
    ],
    days: [
      { value: "lunes", label: "Lunes" },
      { value: "martes", label: "Martes" },
      { value: "miercoles", label: "Miércoles" },
      { value: "jueves", label: "Jueves" },
      { value: "viernes", label: "Viernes" },
      { value: "sabado", label: "Sábado" },
      { value: "domingo", label: "Domingo" },
    ],
  },
  {
    id: 6,
    question: "¿Cuál es tu objetivo principal con las tutorías?",
    options: [
      { value: "mejorar-notas", label: "Mejorar calificaciones actuales" },
      { value: "examen-admision", label: "Preparar examen de admisión" },
      { value: "aprender-cero", label: "Aprender desde cero" },
      { value: "reforzar-temas", label: "Reforzar solo temas específicos" },
    ],
  },
]

const recommendedTutors = [
  {
    id: 1,
    name: "María González",
    subjects: ["Matemáticas", "Física"],
    university: "UNSA",
    rating: 4.9,
    reviews: 127,
    price: 25,
    image: "/placeholder.svg?height=100&width=100",
    matchPercentage: 95,
    whyRecommended:
      "Especialista en matemáticas con metodología visual y práctica. Perfecta para estudiantes de 4° y 5° de secundaria.",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    subjects: ["Química", "Biología"],
    university: "UCSM",
    rating: 4.8,
    reviews: 89,
    price: 30,
    image: "/placeholder.svg?height=100&width=100",
    matchPercentage: 88,
    whyRecommended: "Excelente para ciencias con enfoque práctico. Muy paciente y didáctico en sus explicaciones.",
  },
  {
    id: 3,
    name: "Ana Quispe",
    subjects: ["Literatura", "Historia"],
    university: "UNSA",
    rating: 4.9,
    reviews: 156,
    price: 20,
    image: "/placeholder.svg?height=100&width=100",
    matchPercentage: 82,
    whyRecommended: "Especialista en letras con metodología interactiva. Ideal para desarrollar pensamiento crítico.",
  },
]

export default function AIRecommendationPage() {
  const searchParams = useSearchParams()
  const isNewUser = searchParams.get("newUser") === "true"

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnswer = (questionId: number, answer: string | string[]) => {
    setAnswers({ ...answers, [questionId]: answer })
  }

  const handleMultipleAnswer = (questionId: number, value: string, checked: boolean) => {
    const currentAnswers = (answers[questionId] as string[]) || []
    if (checked) {
      setAnswers({ ...answers, [questionId]: [...currentAnswers, value] })
    } else {
      setAnswers({ ...answers, [questionId]: currentAnswers.filter((a) => a !== value) })
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Simular análisis de IA
      setIsAnalyzing(true)
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowResults(true)
      }, 3000)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setIsAnalyzing(false)
  }

  const currentQuestionData = questions[currentQuestion]
  const hasAnswer =
      answers[currentQuestionData.id] &&
      (Array.isArray(answers[currentQuestionData.id])
          ? (answers[currentQuestionData.id] as string[]).length > 0
          : answers[currentQuestionData.id] !== "")

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Analizando tus respuestas...</h2>
            <p className="text-gray-600">Nuestra IA está encontrando los tutores perfectos para ti</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Sparkles className="h-4 w-4" />
                <span>Procesando preferencias de aprendizaje...</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Brain className="h-4 w-4" />
                <span>Comparando con perfiles de tutores...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
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
                <Button onClick={handleRestart} variant="outline">
                  Hacer test nuevamente
                </Button>
                <div className="relative">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Mi Cuenta</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isNewUser && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h2 className="text-green-800 font-semibold mb-2">¡Bienvenido a TutoríaAQP! 🎉</h2>
                <p className="text-green-700">
                  Hemos analizado tu perfil y estos son los tutores que mejor se adaptan a tus necesidades.
                </p>
              </div>
          )}

          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-orange-600" />
              <h1 className="text-3xl font-bold text-gray-900">¡Tutores Recomendados para Ti!</h1>
            </div>
            <p className="text-gray-600">
              Basado en tus respuestas, estos son los tutores que mejor se adaptan a tu perfil de aprendizaje
            </p>
          </div>

          <div className="space-y-6">
            {recommendedTutors.map((tutor, index) => (
              <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <Image
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                      <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-12 h-12 flex items-center justify-center">
                        {tutor.matchPercentage}%
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold">{tutor.name}</h3>
                        <Badge className="bg-orange-100 text-orange-800">#{index + 1} Recomendado</Badge>
                      </div>

                      <p className="text-gray-600 mb-3">{tutor.university}</p>

                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{tutor.rating}</span>
                          <span className="text-gray-500">({tutor.reviews})</span>
                        </div>
                        <div className="text-lg font-bold text-green-600">S/{tutor.price}/hora</div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {tutor.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary" className="bg-orange-100 text-orange-800">
                            {subject}
                          </Badge>
                        ))}
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg mb-4">
                        <h4 className="font-medium text-green-800 mb-1">¿Por qué es perfecto para ti?</h4>
                        <p className="text-green-700 text-sm">{tutor.whyRecommended}</p>
                      </div>

                      <div className="flex space-x-3">
                        <Link href={`/tutor/${tutor.id}`} className="flex-1">
                          <Button variant="outline" className="w-full bg-transparent">
                            Ver Perfil Completo
                          </Button>
                        </Link>
                        <Link href={`/booking/${tutor.id}`} className="flex-1">
                          <Button className="w-full bg-orange-600 hover:bg-orange-700">Agendar Clase</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">¿No encuentras lo que buscas? Explora todos nuestros tutores</p>
            <Link href="/search">
              <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent">
                Ver Todos los Tutores
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">TutoRedAQP</span>
            </Link>
            {!isNewUser && (
                <Link href="/search">
                  <Button
                      variant="outline"
                      className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Buscar Manualmente
                  </Button>
                </Link>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isNewUser && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h2 className="text-orange-800 font-semibold mb-2">¡Último paso! 🎯</h2>
              <p className="text-orange-700">
                Para recomendarte los mejores tutores, necesitamos conocer un poco más sobre ti.
              </p>
            </div>
        )}

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Recomendación Inteligente</h1>
          </div>
          <p className="text-gray-600">
            Responde unas pocas preguntas y nuestra IA encontrará los tutores perfectos para ti
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestionData.question}</CardTitle>
            <CardDescription>
              {currentQuestionData.type === "multiple"
                  ? "Selecciona todas las opciones que apliquen"
                  : "Selecciona la opción que mejor te describa"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentQuestionData.type === "multiple" ? (
                <div className="space-y-4">
                  {/* Horarios */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Horarios preferidos:</Label>
                    <div className="space-y-2">
                      {currentQuestionData.options?.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={option.value}
                                checked={((answers[currentQuestionData.id] as string[]) || []).includes(option.value)}
                                onCheckedChange={(checked) =>
                                    handleMultipleAnswer(currentQuestionData.id, option.value, checked as boolean)
                                }
                            />
                            <Label htmlFor={option.value}>{option.label}</Label>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Días */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">Días disponibles:</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {currentQuestionData.days?.map((day) => (
                          <div key={day.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={day.value}
                                checked={((answers[currentQuestionData.id] as string[]) || []).includes(day.value)}
                                onCheckedChange={(checked) =>
                                    handleMultipleAnswer(currentQuestionData.id, day.value, checked as boolean)
                                }
                            />
                            <Label htmlFor={day.value}>{day.label}</Label>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
            ) : (
              <RadioGroup
                  value={(answers[currentQuestionData.id] as string) || ""}
                  onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}
              >
                {currentQuestionData.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={!hasAnswer}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                Obtener Recomendaciones
                <Sparkles className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

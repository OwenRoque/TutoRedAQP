import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Star, MapPin, Clock, Calendar, Award, MessageCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"

// Mock data - en una app real vendría de una API
const tutorData = {
  id: 2,
  name: "Gilbert Espinoza",
  subjects: ["Química", "Matemáticas", "Física"],
  university: "Universidad Nacional de San Agustín (UNSA)",
  rating: 5,
  // reviews: 17,
  price: 30,
  image: "/img/gilbert-tutor.jpg?height=150&width=150",
  modality: ["Virtual", "Presencial"],
  experience: "4 años",
  bio: "Soy un estudiante de 4to año en Ingeniería de Telecomunicaciones, y ex-alumno destacado del COAR - Arequipa. Tengo amplia experiencia preparando alumnos en reforzamiento escolar en ciencias y matemáticas. Tengo un enfoque práctico y adaptado al nivel de cada estudiante.",
  schedule: {
    Lunes: ["14:00-18:00"],
    Martes: ["No disponible"],
    Miércoles: ["16:00-20:00"],
    Jueves: ["No disponible"],
    Viernes: ["16:00-20:00"],
    Sábado: ["09:00-12:00", "14:00-17:00"],
    Domingo: ["No disponible"],
  },
  achievements: [
    "Top 5% de tutores mejor calificados",
    "Más de 100 horas de tutoría",
    "Especialista en reforzamiento académico: Ciencias"
  ],
  reviews: [
    {
      id: 1,
      student: "Lucía P.",
      rating: 5,
      comment: "Gilbert explica química de forma sencilla y me ayudó a subir mis notas de Química rápidamente.",
      date: "Hace 1 semana",
    },
    {
      id: 2,
      student: "Pedro S.",
      rating: 5,
      comment: "Muy profesional y puntual. Las clases de física fueron muy didácticas.",
      date: "Hace 3 semanas",
    },
    {
      id: 3,
      student: "Daniela R.",
      rating: 5,
      comment: "Me ayudó muchísimo para prepararme para el examen de admisión, en las preguntas de Física. 100% recomendado.",
      date: "Hace 2 meses",
    },
  ],
}

// { params }: { params: { id: string } }
export default function TutorProfilePage() {
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
              <Link href="/search">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Volver a búsqueda</span>
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información principal del tutor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Perfil básico */}
            <Card>
              <CardHeader>
                <div className="flex items-start space-x-6">
                  <Image
                    src={tutorData.image || "/placeholder.svg"}
                    alt={tutorData.name}
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{tutorData.name}</CardTitle>
                    <CardDescription className="text-lg text-gray-600 mb-3">{tutorData.university}</CardDescription>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-lg">{tutorData.rating}</span>
                        <span className="text-gray-500">({tutorData.reviews.length} reseñas)</span>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <span className="text-gray-600">{tutorData.experience} de experiencia</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tutorData.subjects.map((subject) => (
                        <Badge key={subject} className="bg-orange-100 text-orange-800 text-sm px-3 py-1">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      {tutorData.modality.map((mode) => (
                        <Badge key={mode} variant="outline" className="border-green-600 text-green-600">
                          {mode === "Virtual" ? (
                            <>
                              <Clock className="h-3 w-3 mr-1" /> Virtual
                            </>
                          ) : (
                            <>
                              <MapPin className="h-3 w-3 mr-1" /> Presencial
                            </>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Biografía */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre mí</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{tutorData.bio}</p>
              </CardContent>
            </Card>

            {/* Logros */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  <span>Logros y Certificaciones</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tutorData.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Horarios disponibles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span>Horarios Disponibles</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(tutorData.schedule).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{day}</span>
                      <span className="text-gray-600">
                        {hours[0] === "No disponible" ? (
                          <span className="text-red-500">No disponible</span>
                        ) : (
                          hours.join(", ")
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reseñas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-orange-600" />
                  <span>Reseñas de Estudiantes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tutorData.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarFallback>{review.student.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{review.student}</span>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  Ver todas las reseñas
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar con información de contacto y reserva */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">S/{tutorData.price}</div>
                  <div className="text-gray-600">por hora</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`/booking/${tutorData.id}`}>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3">Agendar Clase</Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent">
                  Enviar Mensaje
                </Button>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Información rápida</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiempo de respuesta:</span>
                      <span className="font-medium">Menos de 1 hora</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clases completadas:</span>
                      <span className="font-medium">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estudiantes activos:</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Última conexión:</span>
                      <span className="font-medium text-orange-600">Hace 1 día</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Apoderado registrado:</span>
                      <span className="font-medium text-green-600">Sí</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">¿Tienes dudas sobre este tutor?</p>
                  <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
                    Contactar soporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

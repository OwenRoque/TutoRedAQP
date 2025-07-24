import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users, BookOpen, Award } from "lucide-react"
import Image from "next/image"
import { UserMenu } from "@/components/user-menu"

const featuredTutors = [
  {
    id: 1,
    name: "María González",
    subjects: ["Matemáticas", "Física"],
    university: "UNSA",
    rating: 4.9,
    reviews: 15,
    price: 25,
    image: "/img/user-placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Gilbert Espinoza",
    subjects: ["Química", "Matemáticas", "Física"],
    university: "UNSA",
    rating: 5,
    reviews: 17,
    price: 30,
    image: "/img/gilbert-tutor.jpg?height=100&width=100",
  },
  {
    id: 3,
    name: "Carlos Mendoza",
    subjects: ["Química", "Biología"],
    university: "UCSM",
    rating: 4.8,
    reviews: 10,
    price: 30,
    image: "/img/user-placeholder.svg?height=100&width=100",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">TutoRedAQP</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/search" className="text-gray-700 hover:text-orange-600 font-medium">
                Buscar Tutores
              </Link>
              <Link href="/ai-recommendation" className="text-gray-700 hover:text-orange-600 font-medium">
                Recomendación IA
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-orange-600 font-medium">
                Cómo Funciona
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {/* Simular usuario logueado - en producción esto vendría del estado de autenticación */}
              {true ? (
                  <UserMenu userType="tutor" userName="Juan Pérez" />
              ) : (
                  <>
                    <Link href="/auth/login">
                      <Button
                          variant="outline"
                          className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                      >
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button className="bg-orange-600 hover:bg-orange-700">Registrarse</Button>
                    </Link>
                  </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Encuentra el <span className="text-orange-600">tutor perfecto</span> en Arequipa
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conectamos estudiantes de secundaria y preuniversitarios con los mejores tutores universitarios de la ciudad
            blanca
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-recommendation">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Award className="mr-2 h-5 w-5" />
                Encuentra tu tutor ideal con IA
              </Button>
            </Link>
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 bg-transparent"
              >
                Explorar tutores
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Tutores Verificados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">2,000+</div>
              <div className="text-gray-600">Estudiantes Activos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">15,000+</div>
              <div className="text-gray-600">Clases Completadas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">4.8★</div>
              <div className="text-gray-600">Calificación Promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tutores Destacados</h2>
            <p className="text-gray-600">Los mejores tutores de Arequipa están aquí para ayudarte</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTutors.map((tutor) => (
              <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Image
                    src={tutor.image || "/placeholder.svg"}
                    alt={tutor.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4"
                  />
                  <CardTitle className="text-xl">{tutor.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">{tutor.university}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="bg-orange-100 text-orange-800">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{tutor.rating}</span>
                      <span className="text-gray-500">({tutor.reviews})</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">S/{tutor.price}/hora</div>
                  </div>
                  <Link href={`/tutor/${tutor.id}`}>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Ver Perfil</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-gray-600">Tres simples pasos para encontrar tu tutor ideal</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Encuentra tu tutor</h3>
              <p className="text-gray-600">
                Usa nuestro buscador o la recomendación con IA para encontrar el tutor perfecto
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Agenda tu clase</h3>
              <p className="text-gray-600">
                Elige fecha, hora y modalidad (virtual o presencial) que mejor te convenga
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Aprende y califica</h3>
              <p className="text-gray-600">
                Recibe tu clase personalizada y califica la experiencia para ayudar a otros
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para mejorar tus notas?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Únete a miles de estudiantes que ya están mejorando con nuestros tutores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register?role=student">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
                Soy Estudiante
              </Button>
            </Link>
            <Link href="/auth/register?role=tutor">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
              >
                Soy Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-orange-600" />
                <span className="text-xl font-bold">TutoRedAQP</span>
              </div>
              <p className="text-gray-400">
                La plataforma líder de tutorías en Arequipa, conectando estudiantes con los mejores tutores
                universitarios.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Para Estudiantes</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/search" className="hover:text-white">
                    Buscar Tutores
                  </Link>
                </li>
                <li>
                  <Link href="/ai-recommendation" className="hover:text-white">
                    Recomendación IA
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    Cómo Funciona
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Para Tutores</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tutor/register" className="hover:text-white">
                    Ser Tutor
                  </Link>
                </li>
                <li>
                  <Link href="/tutor/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/tutor/earnings" className="hover:text-white">
                    Ganancias
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Arequipa, Perú</span>
                </div>
                <div>contacto.tutoredaqp@gmail.com</div>
                <div>+51 955 636 247</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TutoRedAQP. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

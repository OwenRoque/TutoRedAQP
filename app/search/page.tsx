"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { BookOpen, Search, Star, MapPin, Clock, Filter } from "lucide-react"
import Image from "next/image"

const tutors = [
  {
    id: 1,
    name: "María González",
    subjects: ["Matemáticas", "Física"],
    university: "UNSA",
    rating: 4.9,
    reviews: 127,
    price: 25,
    image: "/placeholder.svg?height=100&width=100",
    modality: ["Virtual", "Presencial"],
    experience: "3 años",
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
    modality: ["Virtual"],
    experience: "2 años",
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
    modality: ["Presencial"],
    experience: "4 años",
  },
  {
    id: 4,
    name: "Diego Vargas",
    subjects: ["Inglés", "Filosofía"],
    university: "UTP",
    rating: 4.7,
    reviews: 73,
    price: 28,
    image: "/placeholder.svg?height=100&width=100",
    modality: ["Virtual", "Presencial"],
    experience: "1 año",
  },
  {
    id: 5,
    name: "Lucía Herrera",
    subjects: ["Razonamiento Matemático", "Matemáticas"],
    university: "UCSM",
    rating: 4.8,
    reviews: 94,
    price: 35,
    image: "/placeholder.svg?height=100&width=100",
    modality: ["Virtual"],
    experience: "5 años",
  },
  {
    id: 6,
    name: "Roberto Silva",
    subjects: ["Física", "Química"],
    university: "UNSA",
    rating: 4.6,
    reviews: 62,
    price: 22,
    image: "/placeholder.svg?height=100&width=100",
    modality: ["Presencial"],
    experience: "2 años",
  },
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
  "Razonamiento Matemático",
  "Razonamiento Verbal",
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("")
  const [selectedModality, setSelectedModality] = useState("")
  const [priceRange, setPriceRange] = useState([50])
  const [filteredTutors, setFilteredTutors] = useState(tutors)

  const handleSearch = () => {
    let filtered = tutors

    if (searchTerm) {
      filtered = filtered.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tutor.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedSubject) {
      filtered = filtered.filter((tutor) => tutor.subjects.includes(selectedSubject))
    }

    if (selectedModality) {
      filtered = filtered.filter((tutor) => tutor.modality.includes(selectedModality))
    }

    filtered = filtered.filter((tutor) => tutor.price <= priceRange[0])

    setFilteredTutors(filtered)
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
            <nav className="hidden md:flex space-x-8">
              <Link href="/ai-recommendation" className="text-gray-700 hover:text-orange-600 font-medium">
                Recomendación IA
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-orange-600 font-medium">
                Cómo Funciona
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buscar Tutores</h1>
          <p className="text-gray-600">Encuentra el tutor perfecto para tus necesidades académicas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filtros</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Búsqueda por texto */}
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar por nombre o materia</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Ej: María, Matemáticas..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Materia */}
                <div className="space-y-2">
                  <Label>Materia</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las materias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las materias</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Nivel académico */}
                <div className="space-y-2">
                  <Label>Nivel académico</Label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los niveles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los niveles</SelectItem>
                      <SelectItem value="1-secundaria">1° Secundaria</SelectItem>
                      <SelectItem value="2-secundaria">2° Secundaria</SelectItem>
                      <SelectItem value="3-secundaria">3° Secundaria</SelectItem>
                      <SelectItem value="4-secundaria">4° Secundaria</SelectItem>
                      <SelectItem value="5-secundaria">5° Secundaria</SelectItem>
                      <SelectItem value="preuniversitario">Preuniversitario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Modalidad */}
                <div className="space-y-2">
                  <Label>Modalidad</Label>
                  <Select value={selectedModality} onValueChange={setSelectedModality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las modalidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las modalidades</SelectItem>
                      <SelectItem value="Virtual">Virtual</SelectItem>
                      <SelectItem value="Presencial">Presencial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Precio máximo */}
                <div className="space-y-2">
                  <Label>Precio máximo por hora: S/{priceRange[0]}</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>S/10</span>
                    <span>S/50</span>
                  </div>
                </div>

                <Button onClick={handleSearch} className="w-full bg-orange-600 hover:bg-orange-700">
                  Aplicar Filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredTutors.length} tutores encontrados</p>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Mejor calificados</SelectItem>
                  <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                  <SelectItem value="reviews">Más reseñas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTutors.map((tutor) => (
                <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Image
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-lg">{tutor.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-600 mb-2">
                          {tutor.university} • {tutor.experience} de experiencia
                        </CardDescription>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{tutor.rating}</span>
                          <span className="text-gray-500">({tutor.reviews} reseñas)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">S/{tutor.price}</div>
                        <div className="text-sm text-gray-500">por hora</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Materias:</div>
                      <div className="flex flex-wrap gap-2">
                        {tutor.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary" className="bg-orange-100 text-orange-800">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Modalidad:</div>
                      <div className="flex space-x-2">
                        {tutor.modality.map((mode) => (
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
                    <div className="flex space-x-2">
                      <Link href={`/tutor/${tutor.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Ver Perfil
                        </Button>
                      </Link>
                      <Link href={`/booking/${tutor.id}`} className="flex-1">
                        <Button className="w-full bg-orange-600 hover:bg-orange-700">Agendar Clase</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTutors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron tutores</h3>
                <p className="text-gray-600 mb-4">Intenta ajustar tus filtros para encontrar más opciones</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedSubject("")
                    setSelectedGrade("")
                    setSelectedModality("")
                    setPriceRange([50])
                    setFilteredTutors(tutors)
                  }}
                  variant="outline"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

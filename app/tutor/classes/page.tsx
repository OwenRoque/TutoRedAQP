"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { BookOpen, CalendarIcon, Clock, MapPin, Video, Mail, GraduationCap } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import Image from "next/image"

// Mock data de clases del tutor
const tutorClasses = [
    {
        id: 1,
        subject: "Matemáticas",
        date: "2024-03-20",
        time: "15:00",
        duration: "1 hora",
        modality: "Virtual",
        status: "agendada",
        students: [
            {
                name: "Juan Pérez Mamani",
                grade: "5° Secundaria",
                guardianEmail: "maria.mamani@email.com",
                image: "/placeholder.svg?height=40&width=40",
            },
        ],
        meetingLink: "https://meet.google.com/abc-def-ghi",
    },
    {
        id: 2,
        subject: "Física",
        date: "2024-03-22",
        time: "16:30",
        duration: "1.5 horas",
        modality: "Presencial",
        status: "agendada",
        students: [
            {
                name: "Ana García López",
                grade: "4° Secundaria",
                guardianEmail: "carlos.garcia@email.com",
                image: "/placeholder.svg?height=40&width=40",
            },
            {
                name: "Luis Mendoza Quispe",
                grade: "5° Secundaria",
                guardianEmail: "rosa.quispe@email.com",
                image: "/placeholder.svg?height=40&width=40",
            },
        ],
        location: "Biblioteca Central UNSA",
    },
    {
        id: 3,
        subject: "Matemáticas",
        date: "2024-03-15",
        time: "14:00",
        duration: "1 hora",
        modality: "Virtual",
        status: "completada",
        students: [
            {
                name: "María Condori Silva",
                grade: "Preuniversitario",
                guardianEmail: "pedro.condori@email.com",
                image: "/placeholder.svg?height=40&width=40",
            },
        ],
        rating: 5,
        studentFeedback: "Excelente explicación, muy clara y paciente",
    },
    {
        id: 4,
        subject: "Física",
        date: "2024-03-18",
        time: "17:00",
        duration: "1 hora",
        modality: "Virtual",
        status: "cancelada",
        students: [
            {
                name: "Diego Vargas Mamani",
                grade: "4° Secundaria",
                guardianEmail: "lucia.mamani@email.com",
                image: "/placeholder.svg?height=40&width=40",
            },
        ],
        cancelReason: "Estudiante enfermo",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "agendada":
            return "bg-blue-100 text-blue-800"
        case "completada":
            return "bg-green-100 text-green-800"
        case "cancelada":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case "agendada":
            return "Agendada"
        case "completada":
            return "Completada"
        case "cancelada":
            return "Cancelada"
        default:
            return status
    }
}

export default function TutorClassesPage() {
    const upcomingClasses = tutorClasses.filter((c) => c.status === "agendada")
    const pastClasses = tutorClasses.filter((c) => c.status === "completada" || c.status === "cancelada")

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-2">
                            <BookOpen className="h-8 w-8 text-orange-600" />
                            <span className="text-2xl font-bold text-gray-900">TutoríaAQP</span>
                        </Link>
                        <UserMenu userType="tutor" userName="María González" />
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Clases</h1>
                    <p className="text-gray-600">Gestiona tus clases programadas y revisa tu historial</p>
                </div>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">{upcomingClasses.length}</div>
                            <p className="text-sm text-gray-600">Clases Próximas</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-green-600">
                                {pastClasses.filter((c) => c.status === "completada").length}
                            </div>
                            <p className="text-sm text-gray-600">Completadas</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-orange-600">
                                {tutorClasses.reduce((total, cls) => total + cls.students.length, 0)}
                            </div>
                            <p className="text-sm text-gray-600">Estudiantes Activos</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-purple-600">4.9★</div>
                            <p className="text-sm text-gray-600">Calificación Promedio</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="upcoming" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="upcoming">Próximas Clases ({upcomingClasses.length})</TabsTrigger>
                        <TabsTrigger value="past">Historial ({pastClasses.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="space-y-4">
                        {upcomingClasses.length === 0 ? (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes clases próximas</h3>
                                    <p className="text-gray-600 mb-4">Las nuevas reservas aparecerán aquí automáticamente</p>
                                </CardContent>
                            </Card>
                        ) : (
                            upcomingClasses.map((cls) => (
                                <Card key={cls.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{cls.subject}</h3>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                            <div className="flex items-center space-x-1">
                                                                <CalendarIcon className="h-4 w-4" />
                                                                <span>
                                  {new Date(cls.date).toLocaleDateString("es-PE", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  })}
                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Clock className="h-4 w-4" />
                                                                <span>
                                  {cls.time} ({cls.duration})
                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                {cls.modality === "Virtual" ? (
                                                                    <Video className="h-4 w-4" />
                                                                ) : (
                                                                    <MapPin className="h-4 w-4" />
                                                                )}
                                                                <span>{cls.modality}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Lista de estudiantes */}
                                                <div className="mb-4">
                                                    <h4 className="font-medium text-gray-900 mb-2">Estudiantes ({cls.students.length})</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {cls.students.map((student, index) => (
                                                            <HoverCard key={index}>
                                                                <HoverCardTrigger asChild>
                                                                    <Button variant="ghost" className="h-auto p-2 hover:bg-gray-100">
                                                                        <div className="flex items-center space-x-2">
                                                                            <Image
                                                                                src={student.image || "/placeholder.svg"}
                                                                                alt={student.name}
                                                                                width={24}
                                                                                height={24}
                                                                                className="rounded-full"
                                                                            />
                                                                            <span className="text-sm font-medium">{student.name}</span>
                                                                        </div>
                                                                    </Button>
                                                                </HoverCardTrigger>
                                                                <HoverCardContent className="w-80">
                                                                    <div className="space-y-3">
                                                                        <div className="flex items-center space-x-3">
                                                                            <Image
                                                                                src={student.image || "/placeholder.svg"}
                                                                                alt={student.name}
                                                                                width={40}
                                                                                height={40}
                                                                                className="rounded-full"
                                                                            />
                                                                            <div>
                                                                                <h4 className="font-semibold">{student.name}</h4>
                                                                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                                                    <GraduationCap className="h-3 w-3" />
                                                                                    <span>{student.grade}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center space-x-2 text-sm">
                                                                            <Mail className="h-3 w-3 text-gray-400" />
                                                                            <span className="text-gray-600">Apoderado:</span>
                                                                            <span className="font-medium">{student.guardianEmail}</span>
                                                                        </div>
                                                                    </div>
                                                                </HoverCardContent>
                                                            </HoverCard>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Enlaces y ubicación */}
                                                {cls.modality === "Virtual" && cls.meetingLink && (
                                                    <div className="mb-4">
                                                        <a
                                                            href={cls.meetingLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline text-sm font-medium"
                                                        >
                                                            🔗 Enlace de la reunión
                                                        </a>
                                                    </div>
                                                )}

                                                {cls.modality === "Presencial" && cls.location && (
                                                    <div className="mb-4">
                                                        <p className="text-sm text-gray-600">📍 {cls.location}</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col items-end space-y-2">
                                                <Badge className={getStatusColor(cls.status)}>{getStatusText(cls.status)}</Badge>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="sm">
                                                        Reagendar
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700 bg-transparent"
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="past" className="space-y-4">
                        {pastClasses.map((cls) => (
                            <Card key={cls.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{cls.subject}</h3>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                        <div className="flex items-center space-x-1">
                                                            <CalendarIcon className="h-4 w-4" />
                                                            <span>{new Date(cls.date).toLocaleDateString("es-PE")}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Clock className="h-4 w-4" />
                                                            <span>{cls.time}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            {cls.modality === "Virtual" ? (
                                                                <Video className="h-4 w-4" />
                                                            ) : (
                                                                <MapPin className="h-4 w-4" />
                                                            )}
                                                            <span>{cls.modality}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Estudiantes */}
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {cls.students.map((student, index) => (
                                                        <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-1">
                                                            <Image
                                                                src={student.image || "/placeholder.svg"}
                                                                alt={student.name}
                                                                width={20}
                                                                height={20}
                                                                className="rounded-full"
                                                            />
                                                            <span className="text-sm font-medium">{student.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Feedback del estudiante */}
                                            {cls.status === "completada" && cls.studentFeedback && (
                                                <div className="bg-green-50 p-3 rounded-lg mb-4">
                                                    <h4 className="font-medium text-green-800 mb-1">Comentario del estudiante:</h4>
                                                    <p className="text-green-700 text-sm">`&quot;`{cls.studentFeedback}`&quot;`</p>
                                                    {cls.rating && (
                                                        <div className="flex items-center space-x-1 mt-2">
                                                            <span className="text-sm text-green-600">Calificación:</span>
                                                            <span className="font-semibold text-green-600">{cls.rating}★</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Razón de cancelación */}
                                            {cls.status === "cancelada" && cls.cancelReason && (
                                                <div className="bg-red-50 p-3 rounded-lg mb-4">
                                                    <h4 className="font-medium text-red-800 mb-1">Motivo de cancelación:</h4>
                                                    <p className="text-red-700 text-sm">{cls.cancelReason}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col items-end space-y-2">
                                            <Badge className={getStatusColor(cls.status)}>{getStatusText(cls.status)}</Badge>
                                            {cls.status === "completada" && (
                                                <Button variant="outline" size="sm">
                                                    Ver Reporte
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

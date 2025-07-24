import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, User, Mail, Phone, GraduationCap, Target, Clock, Calendar } from "lucide-react"
import { UserMenu } from "@/components/user-menu"

// Mock data del perfil del estudiante
const studentProfile = {
    name: "Juan Pérez Mamani",
    email: "juan.perez@email.com",
    grade: "5° Secundaria",
    registrationDate: "2024-02-15",
    guardian: {
        email: "maria.mamani@email.com",
        phone: "999 888 777",
    },
    preferences: {
        subjects: ["Matemáticas", "Física", "Química"],
        learningStyle: "Práctico - Aprendo mejor haciendo ejercicios",
        modality: "Ambas modalidades",
        schedule: ["Tardes (12:00 - 18:00)", "Noches (18:00 - 22:00)"],
        days: ["Lunes", "Miércoles", "Viernes", "Sábado"],
        objective: "Preparar examen de admisión",
    },
    stats: {
        totalClasses: 8,
        completedClasses: 5,
        averageRating: 4.6,
        favoriteSubject: "Matemáticas",
    },
}

export default function StudentProfilePage() {
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
                        <UserMenu userType="student" userName="Juan Pérez" />
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
                    <p className="text-gray-600">Información personal y preferencias de aprendizaje</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Información personal */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-orange-600" />
                                    <span>Información Personal</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                                        <p className="text-gray-900 font-medium">{studentProfile.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                                        <p className="text-gray-900">{studentProfile.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Nivel Académico</label>
                                        <p className="text-gray-900">{studentProfile.grade}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Miembro desde</label>
                                        <p className="text-gray-900">
                                            {new Date(studentProfile.registrationDate).toLocaleDateString("es-PE", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Phone className="h-5 w-5 text-green-600" />
                                    <span>Información del Apoderado</span>
                                </CardTitle>
                                <CardDescription>Contacto de emergencia y comunicación</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Correo del Apoderado</label>
                                        <div className="flex items-center space-x-2">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <p className="text-gray-900">{studentProfile.guardian.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Teléfono del Apoderado</label>
                                        <div className="flex items-center space-x-2">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <p className="text-gray-900">{studentProfile.guardian.phone || "No registrado"}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Target className="h-5 w-5 text-orange-600" />
                                    <span>Preferencias de Aprendizaje</span>
                                </CardTitle>
                                <CardDescription>Configuración personalizada para tus tutorías</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Materias de Interés</label>
                                    <div className="flex flex-wrap gap-2">
                                        {studentProfile.preferences.subjects.map((subject) => (
                                            <Badge key={subject} className="bg-orange-100 text-orange-800">
                                                {subject}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Estilo de Aprendizaje</label>
                                    <p className="text-gray-900">{studentProfile.preferences.learningStyle}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Modalidad Preferida</label>
                                    <p className="text-gray-900">{studentProfile.preferences.modality}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Objetivo Principal</label>
                                    <div className="flex items-center space-x-2">
                                        <GraduationCap className="h-4 w-4 text-green-600" />
                                        <p className="text-gray-900">{studentProfile.preferences.objective}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center space-x-1">
                                            <Clock className="h-4 w-4" />
                                            <span>Horarios Disponibles</span>
                                        </label>
                                        <div className="space-y-1">
                                            {studentProfile.preferences.schedule.map((time) => (
                                                <Badge key={time} variant="outline" className="block w-fit">
                                                    {time}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center space-x-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>Días Disponibles</span>
                                        </label>
                                        <div className="flex flex-wrap gap-1">
                                            {studentProfile.preferences.days.map((day) => (
                                                <Badge key={day} variant="outline" className="text-xs">
                                                    {day}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Estadísticas y acciones */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Estadísticas</CardTitle>
                                <CardDescription>Tu progreso en la plataforma</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Clases totales</span>
                                    <span className="font-semibold">{studentProfile.stats.totalClasses}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Clases completadas</span>
                                    <span className="font-semibold">{studentProfile.stats.completedClasses}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Calificación promedio</span>
                                    <span className="font-semibold">{studentProfile.stats.averageRating}★</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Materia favorita</span>
                                    <span className="font-semibold">{studentProfile.stats.favoriteSubject}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Acciones Rápidas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href="/ai-recommendation">
                                    <Button className="w-full bg-green-600 hover:bg-green-700">Nueva Recomendación IA</Button>
                                </Link>
                                <Link href="/search">
                                    <Button variant="outline" className="w-full bg-transparent">
                                        Buscar Tutores
                                    </Button>
                                </Link>
                                <Link href="/student/classes">
                                    <Button variant="outline" className="w-full bg-transparent">
                                        Ver Mis Clases
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full bg-transparent">
                                    Editar Perfil
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Soporte</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-gray-600">¿Necesitas ayuda? Nuestro equipo está aquí para ti.</p>
                                <Button variant="outline" className="w-full bg-transparent">
                                    Contactar Soporte
                                </Button>
                                <Button variant="ghost" className="w-full text-sm">
                                    Centro de Ayuda
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

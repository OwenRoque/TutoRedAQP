"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { BookOpen, CalendarIcon, List, Clock, MapPin, Video, Star } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import Image from "next/image"

// Mock data de clases
const classes = [
    {
        id: 1,
        tutor: {
            name: "María González",
            image: "/placeholder.svg?height=50&width=50",
        },
        subject: "Matemáticas",
        date: "2024-03-20",
        time: "15:00",
        duration: "1 hora",
        modality: "Virtual",
        status: "agendada",
        meetingLink: "https://meet.google.com/abc-def-ghi",
    },
    {
        id: 2,
        tutor: {
            name: "Carlos Mendoza",
            image: "/placeholder.svg?height=50&width=50",
        },
        subject: "Química",
        date: "2024-03-22",
        time: "16:30",
        duration: "1.5 horas",
        modality: "Presencial",
        status: "agendada",
        location: "Biblioteca Central UNSA",
    },
    {
        id: 3,
        tutor: {
            name: "Ana Quispe",
            image: "/placeholder.svg?height=50&width=50",
        },
        subject: "Literatura",
        date: "2024-03-15",
        time: "14:00",
        duration: "1 hora",
        modality: "Virtual",
        status: "completada",
        rating: 5,
    },
    {
        id: 4,
        tutor: {
            name: "Diego Vargas",
            image: "/placeholder.svg?height=50&width=50",
        },
        subject: "Inglés",
        date: "2024-03-18",
        time: "17:00",
        duration: "1 hora",
        modality: "Virtual",
        status: "cancelada",
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

export default function StudentClassesPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

    const upcomingClasses = classes.filter((c) => c.status === "agendada")
    const pastClasses = classes.filter((c) => c.status === "completada" || c.status === "cancelada")

    // Crear eventos para el calendario
    const calendarEvents = classes.reduce(
        (acc, cls) => {
            const date = cls.date
            if (!acc[date]) acc[date] = []
            acc[date].push(cls)
            return acc
        },
        {} as Record<string, typeof classes>,
    )

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Clases</h1>
                    <p className="text-gray-600">Gestiona tus clases agendadas y revisa tu historial</p>
                </div>

                {/* Controles de vista */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-2">
                        <Button
                            variant={viewMode === "list" ? "default" : "outline"}
                            onClick={() => setViewMode("list")}
                            className="flex items-center space-x-2"
                        >
                            <List className="h-4 w-4" />
                            <span>Lista</span>
                        </Button>
                        <Button
                            variant={viewMode === "calendar" ? "default" : "outline"}
                            onClick={() => setViewMode("calendar")}
                            className="flex items-center space-x-2"
                        >
                            <CalendarIcon className="h-4 w-4" />
                            <span>Calendario</span>
                        </Button>
                    </div>
                    <Link href="/search">
                        <Button className="bg-orange-600 hover:bg-orange-700">Agendar Nueva Clase</Button>
                    </Link>
                </div>

                {viewMode === "list" ? (
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
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes clases agendadas</h3>
                                        <p className="text-gray-600 mb-4">¡Es hora de agendar tu próxima clase!</p>
                                        <Link href="/search">
                                            <Button className="bg-orange-600 hover:bg-orange-700">Buscar Tutores</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ) : (
                                upcomingClasses.map((cls) => (
                                    <Card key={cls.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-4">
                                                    <Image
                                                        src={cls.tutor.image || "/placeholder.svg"}
                                                        alt={cls.tutor.name}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-full"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{cls.subject}</h3>
                                                        <p className="text-gray-600 mb-2">con {cls.tutor.name}</p>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                                                        {cls.modality === "Virtual" && cls.meetingLink && (
                                                            <div className="mt-2">
                                                                <a
                                                                    href={cls.meetingLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline text-sm"
                                                                >
                                                                    Unirse a la reunión
                                                                </a>
                                                            </div>
                                                        )}
                                                        {cls.modality === "Presencial" && cls.location && (
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-600">📍 {cls.location}</p>
                                                            </div>
                                                        )}
                                                    </div>
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
                                            <div className="flex items-start space-x-4">
                                                <Image
                                                    src={cls.tutor.image || "/placeholder.svg"}
                                                    alt={cls.tutor.name}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-full"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{cls.subject}</h3>
                                                    <p className="text-gray-600 mb-2">con {cls.tutor.name}</p>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                                                    {cls.status === "completada" && cls.rating && (
                                                        <div className="flex items-center space-x-1 mt-2">
                                                            <span className="text-sm text-gray-600">Tu calificación:</span>
                                                            <div className="flex">
                                                                {[...Array(cls.rating)].map((_, i) => (
                                                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-2">
                                                <Badge className={getStatusColor(cls.status)}>{getStatusText(cls.status)}</Badge>
                                                {cls.status === "completada" && (
                                                    <div className="flex space-x-2">
                                                        <Link href={`/student/progress/${cls.id}`}>
                                                            <Button variant="outline" size="sm">
                                                                Ver Reporte
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/booking/${cls.tutor.name.toLowerCase().replace(" ", "-")}`}>
                                                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                                                Agendar Otra
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Calendario</CardTitle>
                                    <CardDescription>Selecciona una fecha para ver tus clases</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        className="rounded-md border"
                                        modifiers={{
                                            hasClass: (date) => {
                                                const dateStr = date.toISOString().split("T")[0]
                                                return !!calendarEvents[dateStr]
                                            },
                                        }}
                                        modifiersStyles={{
                                            hasClass: { backgroundColor: "#fed7aa", fontWeight: "bold" },
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Clases del{" "}
                                        {selectedDate?.toLocaleDateString("es-PE", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {selectedDate &&
                                        (() => {
                                            const dateStr = selectedDate.toISOString().split("T")[0]
                                            const dayClasses = calendarEvents[dateStr] || []

                                            if (dayClasses.length === 0) {
                                                return (
                                                    <div className="text-center py-8">
                                                        <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                                        <p className="text-gray-600">No tienes clases programadas para este día</p>
                                                    </div>
                                                )
                                            }

                                            return (
                                                <div className="space-y-4">
                                                    {dayClasses.map((cls) => (
                                                        <div key={cls.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                                            <Image
                                                                src={cls.tutor.image || "/placeholder.svg"}
                                                                alt={cls.tutor.name}
                                                                width={40}
                                                                height={40}
                                                                className="rounded-full"
                                                            />
                                                            <div className="flex-1">
                                                                <h4 className="font-medium">{cls.subject}</h4>
                                                                <p className="text-sm text-gray-600">con {cls.tutor.name}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {cls.time} - {cls.modality}
                                                                </p>
                                                            </div>
                                                            <Badge className={getStatusColor(cls.status)}>{getStatusText(cls.status)}</Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        })()}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

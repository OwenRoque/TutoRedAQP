"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, CalendarIcon, Clock, MapPin, User, ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"
import { use } from "react"

// Mock data del tutor
const tutorData = {
  id: 2,
  name: "Gilbert Espinoza",
  subjects: ["Química", "Matemáticas", "Física"],
  university: "UNSA",
  rating: 5,
  reviews: 17,
  price: 30,
  image: "/img/gilbert-tutor.jpg?height=100&width=100",
  modality: ["Virtual", "Presencial"],
}

const timeSlots = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"]

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const tutorId = use(params)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedModality, setSelectedModality] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [duration, setDuration] = useState("60")
  const [notes, setNotes] = useState("")
  const [step, setStep] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Procesar la reserva
      console.log("Booking submitted:", {
        tutorId: tutorId,
        date: selectedDate,
        time: selectedTime,
        modality: selectedModality,
        subject: selectedSubject,
        duration,
        notes,
      })
    }
  }

  const totalPrice = Number.parseInt(duration) === 60 ? tutorData.price : Math.round(tutorData.price * 1.5)

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
              <Link href={`/tutor/${tutorId}`}>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Volver al perfil</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-orange-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="text-sm text-gray-600">
              {step === 1 && "Selecciona fecha y hora"}
              {step === 2 && "Detalles de la clase"}
              {step === 3 && "Confirmar reserva"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario principal */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-orange-600" />
                      <span>Selecciona fecha y hora</span>
                    </CardTitle>
                    <CardDescription>Elige cuándo quieres tener tu clase con {tutorData.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Fecha</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-md border"
                      />
                    </div>

                    {selectedDate && (
                      <div>
                        <Label className="text-base font-medium mb-3 block">Hora disponible</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "default" : "outline"}
                              className={selectedTime === time ? "bg-orange-600 hover:bg-orange-700" : ""}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-orange-600" />
                      <span>Detalles de la clase</span>
                    </CardTitle>
                    <CardDescription>Proporciona información adicional sobre tu clase</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Modalidad</Label>
                      <RadioGroup value={selectedModality} onValueChange={setSelectedModality}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Virtual" id="virtual" />
                          <Label htmlFor="virtual" className="flex items-center space-x-2 cursor-pointer">
                            <Clock className="h-4 w-4" />
                            <span>Virtual (Google Meet/Zoom)</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Presencial" id="presencial" />
                          <Label htmlFor="presencial" className="flex items-center space-x-2 cursor-pointer">
                            <MapPin className="h-4 w-4" />
                            <span>Presencial (Lugar por coordinar)</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Materia</Label>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la materia" />
                        </SelectTrigger>
                        <SelectContent>
                          {tutorData.subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Duración</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">1 hora (S/{tutorData.price})</SelectItem>
                          <SelectItem value="90">1.5 horas (S/{Math.round(tutorData.price * 1.5)})</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Describe qué temas específicos quieres repasar o cualquier información relevante..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Confirmar reserva</span>
                    </CardTitle>
                    <CardDescription>Revisa los detalles de tu clase antes de confirmar</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fecha:</span>
                        <span className="font-medium">
                          {selectedDate?.toLocaleDateString("es-PE", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hora:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duración:</span>
                        <span className="font-medium">{duration === "60" ? "1 hora" : "1.5 horas"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Modalidad:</span>
                        <span className="font-medium">{selectedModality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Materia:</span>
                        <span className="font-medium">{selectedSubject}</span>
                      </div>
                      {notes && (
                        <div>
                          <span className="text-gray-600">Notas:</span>
                          <p className="text-sm text-gray-700 mt-1">{notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Anterior
                  </Button>
                )}
                <Button
                  type="submit"
                  className={`${step === 1 ? "ml-auto" : ""} ${
                    step === 3 ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"
                  }`}
                  disabled={
                    (step === 1 && (!selectedDate || !selectedTime)) ||
                    (step === 2 && (!selectedModality || !selectedSubject))
                  }
                >
                  {step === 3 ? "Confirmar y Pagar" : "Siguiente"}
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar con resumen */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen de la clase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src={tutorData.image || "/placeholder.svg"}
                    alt={tutorData.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{tutorData.name}</div>
                    <div className="text-sm text-gray-600">{tutorData.university}</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  {selectedDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fecha:</span>
                      <span>{selectedDate.toLocaleDateString("es-PE")}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hora:</span>
                      <span>{selectedTime}</span>
                    </div>
                  )}
                  {duration && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duración:</span>
                      <span>{duration === "60" ? "1 hora" : "1.5 horas"}</span>
                    </div>
                  )}
                  {selectedModality && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Modalidad:</span>
                      <Badge variant="outline" className="text-xs">
                        {selectedModality}
                      </Badge>
                    </div>
                  )}
                  {selectedSubject && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Materia:</span>
                      <Badge className="bg-orange-100 text-orange-800 text-xs">{selectedSubject}</Badge>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>S/{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comisión de plataforma:</span>
                    <span>S/2</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">S/{totalPrice + 2}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-4">
                  <p>• Puedes cancelar hasta 2 horas antes sin costo</p>
                  <p>• Recibirás un enlace de la clase por email</p>
                  <p>• El pago se procesa de forma segura</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CreditCard, Smartphone, Shield, ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"

// Mock data de la reserva
const bookingData = {
  id: "BK-2024-001",
  tutor: {
    name: "María González",
    image: "/placeholder.svg?height=60&width=60",
  },
  date: "Viernes, 15 de Marzo 2024",
  time: "15:00",
  duration: "1 hora",
  subject: "Matemáticas",
  modality: "Virtual",
  price: 25,
  platformFee: 2,
  total: 27,
}

export default function PaymentPage({ params }: { params: { bookingId: string } }) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentComplete(true)
    }, 3000)
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
            <p className="text-gray-600 mb-6">
              Tu clase ha sido reservada exitosamente. Recibirás un email con los detalles.
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Número de reserva</div>
                <div className="font-mono font-semibold">{bookingData.id}</div>
              </div>
              <div className="text-sm text-gray-600">
                <p>• Recibirás el enlace de la clase por email</p>
                <p>• El tutor te contactará 30 min antes</p>
                <p>• Puedes cancelar hasta 2 horas antes</p>
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/dashboard">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Ver Mis Clases</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Procesando pago...</h2>
            <p className="text-gray-600">Por favor espera mientras procesamos tu pago de forma segura</p>
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
              <Link href={`/booking/${params.bookingId}`}>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Volver</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Completar Pago</h1>
          <p className="text-gray-600">Finaliza tu reserva de clase con pago seguro</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de pago */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Método de pago */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                    <span>Método de Pago</span>
                  </CardTitle>
                  <CardDescription>Selecciona tu método de pago preferido</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="yape" id="yape" />
                        <Label htmlFor="yape" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                            <Smartphone className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">Yape</div>
                            <div className="text-sm text-gray-600">Pago instantáneo con tu celular</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="plin" id="plin" />
                        <Label htmlFor="plin" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <Smartphone className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">Plin</div>
                            <div className="text-sm text-gray-600">Transferencia inmediata</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">Tarjeta de Crédito/Débito</div>
                            <div className="text-sm text-gray-600">Visa, Mastercard</div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Detalles del método de pago */}
              {paymentMethod === "yape" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Pago con Yape</CardTitle>
                    <CardDescription>Ingresa tu número de celular registrado en Yape</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Número de celular</Label>
                        <Input
                          id="phone"
                          placeholder="999 888 777"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-800">
                          <strong>Instrucciones:</strong> Después de confirmar, recibirás una notificación en tu app
                          Yape para aprobar el pago de S/{bookingData.total}.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "plin" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Pago con Plin</CardTitle>
                    <CardDescription>Ingresa tu número de celular registrado en Plin</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="plin-phone">Número de celular</Label>
                        <Input
                          id="plin-phone"
                          placeholder="999 888 777"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Instrucciones:</strong> Recibirás un SMS con el código de autorización para completar
                          el pago de S/{bookingData.total}.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "card" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Información de la Tarjeta</CardTitle>
                    <CardDescription>Ingresa los datos de tu tarjeta de crédito o débito</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Nombre en la tarjeta</Label>
                        <Input
                          id="card-name"
                          placeholder="Juan Pérez"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Número de tarjeta</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Vencimiento</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <p className="text-sm text-gray-700">
                          Tu información está protegida con encriptación SSL de 256 bits
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                disabled={!paymentMethod}
              >
                Confirmar Pago - S/{bookingData.total}
              </Button>
            </form>
          </div>

          {/* Resumen de la reserva */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen de la Reserva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src={bookingData.tutor.image || "/placeholder.svg"}
                    alt={bookingData.tutor.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{bookingData.tutor.name}</div>
                    <div className="text-sm text-gray-600">Tutor</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span>{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hora:</span>
                    <span>{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duración:</span>
                    <span>{bookingData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Materia:</span>
                    <Badge className="bg-orange-100 text-orange-800 text-xs">{bookingData.subject}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Modalidad:</span>
                    <Badge variant="outline" className="text-xs">
                      {bookingData.modality}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clase (1 hora):</span>
                    <span>S/{bookingData.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comisión plataforma:</span>
                    <span>S/{bookingData.platformFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">S/{bookingData.total}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Pago 100% seguro y encriptado</p>
                  <p>• Cancelación gratuita hasta 2h antes</p>
                  <p>• Soporte 24/7 disponible</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

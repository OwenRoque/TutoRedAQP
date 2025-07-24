import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, TrendingUp, Calendar, FileText } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import Image from "next/image"

// Mock data de reportes de progreso
const progressReports = [
    {
        id: 1,
        classId: 3,
        tutor: {
            name: "Ana Quispe",
            image: "/placeholder.svg?height=50&width=50",
        },
        subject: "Literatura",
        date: "2024-03-15",
        topic: "Análisis de 'Cien años de soledad'",
        tutorComments:
            "Excelente comprensión del realismo mágico. María demostró gran capacidad analítica al interpretar los símbolos y metáforas de la obra. Recomiendo continuar con más obras del boom latinoamericano.",
        performance: "Excelente",
        comprehensionLevel: 90,
        evaluationResults: "9/10 en análisis literario",
        nextSteps: "Leer 'Pedro Páramo' de Juan Rulfo para la próxima sesión",
    },
    {
        id: 2,
        classId: 5,
        tutor: {
            name: "María González",
            image: "/placeholder.svg?height=50&width=50",
        },
        subject: "Matemáticas",
        date: "2024-03-12",
        topic: "Funciones cuadráticas y parábolas",
        tutorComments:
            "Buen progreso en el entendimiento de funciones cuadráticas. Necesita más práctica con la forma canónica y el vértice de la parábola. Los ejercicios de aplicación fueron resueltos correctamente.",
        performance: "Bueno",
        comprehensionLevel: 75,
        evaluationResults: "7/10 en ejercicios prácticos",
        nextSteps: "Practicar más ejercicios de optimización con funciones cuadráticas",
    },
    {
        id: 3,
        classId: 7,
        tutor: {
            name: "Carlos Mendoza",
            image: "/placeholder.svg?height=50&width=50",
        },
        subject: "Química",
        date: "2024-03-10",
        topic: "Balanceo de ecuaciones químicas",
        tutorComments:
            "Conceptos básicos bien entendidos. Mostró dificultad inicial con ecuaciones complejas pero mejoró significativamente durante la sesión. Muy participativo y hace buenas preguntas.",
        performance: "Regular",
        comprehensionLevel: 65,
        evaluationResults: "6/10 en balanceo de ecuaciones complejas",
        nextSteps: "Reforzar con más ejercicios de balanceo por método algebraico",
    },
]

const getPerformanceColor = (performance: string) => {
    switch (performance.toLowerCase()) {
        case "excelente":
            return "bg-green-100 text-green-800"
        case "bueno":
            return "bg-blue-100 text-blue-800"
        case "regular":
            return "bg-yellow-100 text-yellow-800"
        case "necesita mejorar":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

// const getComprehensionColor = (level: number) => {
//     if (level >= 80) return "bg-green-500"
//     if (level >= 60) return "bg-yellow-500"
//     return "bg-red-500"
// }

export default function StudentProgressPage() {
    const averageComprehension = Math.round(
        progressReports.reduce((sum, report) => sum + report.comprehensionLevel, 0) / progressReports.length,
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Progreso Académico</h1>
                    <p className="text-gray-600">Revisa tu evolución y los reportes de tus tutores</p>
                </div>

                {/* Resumen general */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Clases Completadas</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{progressReports.length}</div>
                            <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Comprensión Promedio</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{averageComprehension}%</div>
                            <Progress value={averageComprehension} className="mt-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Materias Activas</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">Literatura, Matemáticas, Química</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Lista de reportes */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Reportes de Progreso</h2>

                    {progressReports.map((report) => (
                        <Card key={report.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src={report.tutor.image || "/placeholder.svg"}
                                            alt={report.tutor.name}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <CardTitle className="text-lg">{report.subject}</CardTitle>
                                            <CardDescription>
                                                {report.topic} • {new Date(report.date).toLocaleDateString("es-PE")} • {report.tutor.name}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Badge className={getPerformanceColor(report.performance)}>{report.performance}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Nivel de comprensión */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">Nivel de Comprensión</span>
                                        <span className="text-sm font-semibold">{report.comprehensionLevel}%</span>
                                    </div>
                                    <Progress value={report.comprehensionLevel} className="h-2" />
                                </div>

                                {/* Comentarios del tutor */}
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Comentarios del Tutor</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">{report.tutorComments}</p>
                                </div>

                                {/* Resultados de evaluación */}
                                {report.evaluationResults && (
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Resultados de Evaluación</h4>
                                        <p className="text-gray-700 text-sm">{report.evaluationResults}</p>
                                    </div>
                                )}

                                {/* Próximos pasos */}
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Próximos Pasos</h4>
                                    <p className="text-gray-700 text-sm">{report.nextSteps}</p>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t">
                                    <Link href={`/student/progress/${report.id}`}>
                                        <Button variant="outline" size="sm">
                                            Ver Reporte Completo
                                        </Button>
                                    </Link>
                                    <Link href={`/booking/${report.tutor.name.toLowerCase().replace(" ", "-")}`}>
                                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                            Agendar Otra Clase
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {progressReports.length === 0 && (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reportes disponibles</h3>
                            <p className="text-gray-600 mb-4">
                                Los reportes de progreso aparecerán aquí después de completar tus clases
                            </p>
                            <Link href="/search">
                                <Button className="bg-orange-600 hover:bg-orange-700">Agendar tu Primera Clase</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

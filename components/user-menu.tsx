"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Brain, Calendar, TrendingUp, LogOut } from "lucide-react"

interface UserMenuProps {
    userType: "student" | "tutor"
    userName: string
}

export function UserMenu({ userType, userName }: UserMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">{userName}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {userType === "student" && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/ai-recommendation" className="flex items-center space-x-2">
                                <Brain className="h-4 w-4" />
                                <span>Recomendación IA</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/student/classes" className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>Mis Clases</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/student/progress" className="flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4" />
                                <span>Progreso Académico</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/student/profile" className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>Mi Perfil</span>
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}

                {userType === "tutor" && (
                    <DropdownMenuItem asChild>
                        <Link href="/tutor/classes" className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Mis Clases</span>
                        </Link>
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Cerrar Sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

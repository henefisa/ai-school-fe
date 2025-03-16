"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LightbulbIcon as SwitchIcon } from "lucide-react"

export function RoleSwitcher() {
  const { user, switchRole } = useAuth()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <SwitchIcon className="mr-2 h-4 w-4" />
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)} View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={user.role} onValueChange={(value) => switchRole(value as any)}>
          <DropdownMenuRadioItem value="admin">Administrator</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="teacher">Teacher</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="parent">Parent</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="student">Student</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SchoolIcon, BookOpen, Users, Calendar, CreditCard, BookmarkIcon, BarChart3Icon } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <SchoolIcon className="h-6 w-6" />
            <span className="text-xl font-bold">EduManage</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Simplify School Management
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A comprehensive platform for administrators, teachers, students, and parents to streamline education
                    management.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=550&width=550"
                  alt="School Management Dashboard"
                  className="rounded-lg object-cover shadow-lg"
                  width={550}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comprehensive Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your educational institution efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle>User Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Role-based access control for administrators, teachers, students, and parents.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle>Student Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Comprehensive student records, attendance tracking, and grade management.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle>Scheduling</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Automated timetable generation and class scheduling for efficient planning.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle>Financial Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Fee management, expense tracking, and comprehensive financial reporting.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BookmarkIcon className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle>Curriculum Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Course catalog, curriculum planning, and resource management tools.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BarChart3Icon className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <CardTitle>Reporting & Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Customizable reports and data visualization for informed decision-making.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <SchoolIcon className="h-6 w-6" />
            <span className="text-xl font-bold">EduManage</span>
          </div>
          <p className="text-sm text-muted-foreground md:text-base">
            © {new Date().getFullYear()} EduManage. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


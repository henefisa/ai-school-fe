"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Clock, Download, FileText, PencilIcon, Users } from "lucide-react"

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Sample assignment data
  const assignment = {
    id: params.id,
    title: "Quadratic Equations Practice",
    course: { id: 1, name: "Algebra I", grade: "10A" },
    dueDate: "2025-03-25",
    dueTime: "23:59",
    status: "active",
    description: `
      This assignment is designed to help you practice solving quadratic equations using different methods. Complete the following problems:
      
      1. Solve by factoring:
         a) x² + 5x + 6 = 0
         b) 2x² - 7x - 15 = 0
         c) 3x² - 12 = 0
      
      2. Solve by completing the square:
         a) x² - 6x + 8 = 0
         b) x² + 8x + 12 = 0
      
      3. Solve using the quadratic formula:
         a) 2x² + 5x - 3 = 0
         b) 3x² - 2x - 1 = 0
      
      Show all your work for each problem. Points will be awarded for correct process and final answers.
    `,
    maxPoints: 100,
    category: "homework",
    submissionType: "file",
    resources: [
      { id: 1, name: "Quadratic Equations Reference.pdf", size: "1.2 MB" },
      { id: 2, name: "Assignment Template.docx", size: "45 KB" },
    ],
    assignedTo: {
      type: "class",
      class: "10A",
      totalStudents: 30,
    },
    submissions: {
      total: 15,
      graded: 5,
      ungraded: 10,
      late: 2,
    },
    allowLateSubmissions: true,
    latePenalty: 10,
    gradeVisibility: "after_grading",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/assignments">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{assignment.title}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/assignments/${params.id}/edit`}>
            <Button variant="outline">
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit Assignment
            </Button>
          </Link>
          <Link href={`/dashboard/assignments/${params.id}/submissions`}>
            <Button>View Submissions</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignment.course.name}</div>
            <p className="text-xs text-muted-foreground">Grade {assignment.course.grade}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(assignment.dueDate).toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">at {assignment.dueTime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant={assignment.status === "active" ? "default" : "secondary"}>
                {assignment.status === "active" ? "Active" : "Closed"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Assignment status</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {assignment.description.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                    <dd className="text-sm capitalize">{assignment.category}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-muted-foreground">Maximum Points</dt>
                    <dd className="text-sm">{assignment.maxPoints}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-muted-foreground">Submission Type</dt>
                    <dd className="text-sm capitalize">{assignment.submissionType} Upload</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-muted-foreground">Late Submissions</dt>
                    <dd className="text-sm">
                      {assignment.allowLateSubmissions
                        ? `Allowed (${assignment.latePenalty}% penalty per day)`
                        : "Not allowed"}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-muted-foreground">Grade Visibility</dt>
                    <dd className="text-sm">
                      {assignment.gradeVisibility === "after_grading" && "After grading"}
                      {assignment.gradeVisibility === "after_due_date" && "After due date"}
                      {assignment.gradeVisibility === "immediately" && "Immediately"}
                      {assignment.gradeVisibility === "manual" && "Manual release"}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assigned To</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {assignment.assignedTo.type === "class"
                        ? `Class ${assignment.assignedTo.class}`
                        : "Selected Students"}
                    </p>
                    <p className="text-sm text-muted-foreground">{assignment.assignedTo.totalStudents} students</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Submission Rate</span>
                      <span className="text-sm text-muted-foreground">
                        {assignment.submissions.total}/{assignment.assignedTo.totalStudents}
                      </span>
                    </div>
                    <Progress
                      value={(assignment.submissions.total / assignment.assignedTo.totalStudents) * 100}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Grading Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {assignment.submissions.graded}/{assignment.submissions.total}
                      </span>
                    </div>
                    <Progress
                      value={(assignment.submissions.graded / assignment.submissions.total) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Resources</CardTitle>
              <CardDescription>Files and resources for this assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignment.resources.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No resources available</p>
                  </div>
                ) : (
                  assignment.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center gap-4 p-4 border rounded-md">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-sm text-muted-foreground">{resource.size}</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4">
                <Link href={`/dashboard/assignments/${params.id}/edit`}>
                  <Button variant="outline">
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Manage Resources
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submission Summary</CardTitle>
              <CardDescription>Overview of student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{assignment.submissions.total}</div>
                    <p className="text-xs text-muted-foreground">
                      {((assignment.submissions.total / assignment.assignedTo.totalStudents) * 100).toFixed(0)}% of
                      students
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Graded</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{assignment.submissions.graded}</div>
                    <p className="text-xs text-muted-foreground">
                      {((assignment.submissions.graded / assignment.submissions.total) * 100).toFixed(0)}% of
                      submissions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Ungraded</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-600">{assignment.submissions.ungraded}</div>
                    <p className="text-xs text-muted-foreground">
                      {((assignment.submissions.ungraded / assignment.submissions.total) * 100).toFixed(0)}% of
                      submissions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Late</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{assignment.submissions.late}</div>
                    <p className="text-xs text-muted-foreground">
                      {((assignment.submissions.late / assignment.submissions.total) * 100).toFixed(0)}% of submissions
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Link href={`/dashboard/assignments/${params.id}/submissions`}>
                  <Button>View All Submissions</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Settings</CardTitle>
              <CardDescription>Configure assignment settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="font-medium">Assignment Status</p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.status === "active" ? "Currently active" : "Closed"}
                    </p>
                  </div>
                  <Button variant="outline">
                    {assignment.status === "active" ? "Close Assignment" : "Reopen Assignment"}
                  </Button>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="font-medium">Grade Visibility</p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.gradeVisibility === "after_grading" && "Grades visible after grading"}
                      {assignment.gradeVisibility === "after_due_date" && "Grades visible after due date"}
                      {assignment.gradeVisibility === "immediately" && "Grades visible immediately"}
                      {assignment.gradeVisibility === "manual" && "Grades visible after manual release"}
                    </p>
                  </div>
                  <Button variant="outline">Change Visibility</Button>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="font-medium">Late Submissions</p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.allowLateSubmissions
                        ? `Allowed with ${assignment.latePenalty}% penalty per day`
                        : "Not allowed"}
                    </p>
                  </div>
                  <Button variant="outline">{assignment.allowLateSubmissions ? "Disallow" : "Allow"}</Button>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-md">
                  <div>
                    <p className="font-medium">Delete Assignment</p>
                    <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


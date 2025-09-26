import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StudentManagement from '@/components/StudentManagement';
import LessonPlanning from '@/components/LessonPlanning';
import AssignmentManagement from '@/components/AssignmentManagement';
import CommunicationCenter from '@/components/CommunicationCenter';
import { 
  Users, BookOpen, TrendingUp, Award, Plus, Search, Filter, 
  MessageSquare, Calendar, FileText, Star, Clock, CheckCircle,
  AlertCircle, UserCheck, BookMarked, GraduationCap, BarChart3
} from 'lucide-react';

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const classes = [
    { id: 'class1', name: 'Class 5A - Punjabi', students: 28, subject: 'Punjabi' },
    { id: 'class2', name: 'Class 6B - Hindi', students: 32, subject: 'Hindi' },
    { id: 'class3', name: 'Class 7A - Math', students: 25, subject: 'Math' }
  ];

  const students = [
    { id: 1, name: 'Ravi Singh', class: 'Class 5A', score: 92, attendance: 95, assignments: 8, lastActive: '2 hours ago' },
    { id: 2, name: 'Priya Kaur', class: 'Class 5A', score: 88, attendance: 98, assignments: 7, lastActive: '1 day ago' },
    { id: 3, name: 'Amit Kumar', class: 'Class 6B', score: 76, attendance: 90, assignments: 6, lastActive: '3 hours ago' },
    { id: 4, name: 'Simran Bhatia', class: 'Class 6B', score: 94, attendance: 100, assignments: 9, lastActive: '1 hour ago' },
    { id: 5, name: 'Rajesh Verma', class: 'Class 7A', score: 85, attendance: 92, assignments: 8, lastActive: '4 hours ago' }
  ];

  const assignments = [
    { id: 1, title: 'Punjabi Grammar Quiz', class: 'Class 5A', dueDate: '2024-01-15', submissions: 24, total: 28, status: 'active' },
    { id: 2, title: 'Hindi Essay Writing', class: 'Class 6B', dueDate: '2024-01-18', submissions: 18, total: 32, status: 'active' },
    { id: 3, title: 'Math Problem Set', class: 'Class 7A', dueDate: '2024-01-12', submissions: 25, total: 25, status: 'completed' }
  ];

  const announcements = [
    { id: 1, title: 'Parent-Teacher Meeting', content: 'Scheduled for next Friday at 3 PM', date: '2024-01-10', priority: 'high' },
    { id: 2, title: 'Holiday Notice', content: 'School will be closed on Republic Day', date: '2024-01-15', priority: 'medium' },
    { id: 3, title: 'Exam Schedule', content: 'Mid-term exams starting next week', date: '2024-01-20', priority: 'high' }
  ];

  const performanceData = [
    { name: 'Week 1', score: 78, attendance: 92 },
    { name: 'Week 2', score: 82, attendance: 95 },
    { name: 'Week 3', score: 85, attendance: 88 },
    { name: 'Week 4', score: 89, attendance: 94 },
    { name: 'Week 5', score: 91, attendance: 96 }
  ];

  const subjectDistribution = [
    { name: 'Punjabi', value: 40, color: '#3b82f6' },
    { name: 'Hindi', value: 35, color: '#10b981' },
    { name: 'Math', value: 25, color: '#f59e0b' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-light/10 to-edu-green-light/10 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Teacher Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your classes, track student progress, and create engaging content
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="edu-card-shadow hover:edu-card-shadow-hover edu-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-sm text-edu-green font-medium">+12 this month</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="edu-card-shadow hover:edu-card-shadow-hover edu-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Classes</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-edu-green font-medium">All running</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="edu-card-shadow hover:edu-card-shadow-hover edu-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assignments Due</p>
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-sm text-orange-600 font-medium">This week</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="edu-card-shadow hover:edu-card-shadow-hover edu-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Performance</p>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                  <p className="text-sm text-edu-green font-medium">+5% this month</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <Card className="edu-card-shadow">
                <CardHeader>
                  <CardTitle className="text-edu-blue">Class Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Subject Distribution */}
              <Card className="edu-card-shadow">
                <CardHeader>
                  <CardTitle className="text-edu-green">Subject Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={subjectDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {subjectDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Announcements */}
            <Card className="edu-card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-edu-blue"></div>
                        <div>
                          <p className="font-medium text-foreground">{announcement.title}</p>
                          <p className="text-sm text-muted-foreground">{announcement.content}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(announcement.priority)}>
                          {announcement.priority}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{announcement.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons">
            <LessonPlanning />
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <AssignmentManagement />
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication">
            <CommunicationCenter />
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Content Management</h3>
              <Button className="bg-edu-blue hover:bg-edu-blue-dark">
                <Plus className="h-4 w-4 mr-2" />
                Create Content
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="edu-card-shadow hover:edu-card-shadow-hover edu-transition cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookMarked className="h-12 w-12 text-edu-blue mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Lesson Plans</h3>
                  <p className="text-sm text-muted-foreground mb-4">Create and manage lesson plans</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </CardContent>
              </Card>

              <Card className="edu-card-shadow hover:edu-card-shadow-hover edu-transition cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-edu-green mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Resources</h3>
                  <p className="text-sm text-muted-foreground mb-4">Upload and organize teaching materials</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </CardContent>
              </Card>

              <Card className="edu-card-shadow hover:edu-card-shadow-hover edu-transition cursor-pointer">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Assessments</h3>
                  <p className="text-sm text-muted-foreground mb-4">Create quizzes and tests</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h3 className="text-lg font-semibold">Detailed Analytics</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="edu-card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Student Performance by Class
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: 'Class 5A', average: 87, students: 28 },
                      { name: 'Class 6B', average: 82, students: 32 },
                      { name: 'Class 7A', average: 89, students: 25 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Bar dataKey="average" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="edu-card-shadow">
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classes.map((cls, index) => (
                      <div key={cls.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{cls.name}</p>
                          <p className="text-sm text-muted-foreground">{cls.students} students</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-edu-green">94%</p>
                          <p className="text-sm text-muted-foreground">attendance</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, Plus, Calendar, Clock, Users, Target, 
  CheckCircle, AlertCircle, Edit, Trash2, Eye, Download,
  Upload, Star, MessageSquare
} from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  description: string;
  subject: string;
  class: string;
  dueDate: string;
  createdAt: string;
  totalStudents: number;
  submittedStudents: number;
  status: 'draft' | 'active' | 'completed' | 'graded';
  maxMarks: number;
  averageScore?: number;
  instructions: string;
  attachments: string[];
}

interface Submission {
  id: number;
  studentName: string;
  studentId: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late';
  score?: number;
  feedback?: string;
  attachments: string[];
}

const AssignmentManagement = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [activeTab, setActiveTab] = useState('assignments');

  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'Punjabi Grammar Quiz',
      description: 'Test your understanding of basic Punjabi grammar rules',
      subject: 'Punjabi',
      class: 'Class 5A',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10',
      totalStudents: 28,
      submittedStudents: 24,
      status: 'active',
      maxMarks: 100,
      averageScore: 87,
      instructions: 'Complete all questions within the time limit. Show your work clearly.',
      attachments: ['grammar_rules.pdf', 'sample_questions.pdf']
    },
    {
      id: 2,
      title: 'Hindi Essay Writing',
      description: 'Write a 300-word essay on your favorite festival',
      subject: 'Hindi',
      class: 'Class 6B',
      dueDate: '2024-01-18',
      createdAt: '2024-01-12',
      totalStudents: 32,
      submittedStudents: 18,
      status: 'active',
      maxMarks: 50,
      instructions: 'Use proper Hindi grammar and vocabulary. Include an introduction, body, and conclusion.',
      attachments: ['essay_rubric.pdf', 'sample_essays.pdf']
    },
    {
      id: 3,
      title: 'Math Problem Set',
      description: 'Solve algebraic equations and word problems',
      subject: 'Math',
      class: 'Class 7A',
      dueDate: '2024-01-12',
      createdAt: '2024-01-08',
      totalStudents: 25,
      submittedStudents: 25,
      status: 'graded',
      maxMarks: 100,
      averageScore: 92,
      instructions: 'Show all steps clearly. Use proper mathematical notation.',
      attachments: ['problem_set.pdf', 'formula_sheet.pdf']
    }
  ];

  const submissions: Submission[] = [
    {
      id: 1,
      studentName: 'Ravi Singh',
      studentId: '5A001',
      submittedAt: '2024-01-14 14:30',
      status: 'graded',
      score: 95,
      feedback: 'Excellent work! Great understanding of grammar rules.',
      attachments: ['ravi_quiz.pdf']
    },
    {
      id: 2,
      studentName: 'Priya Kaur',
      studentId: '5A002',
      submittedAt: '2024-01-14 16:45',
      status: 'graded',
      score: 88,
      feedback: 'Good work, but pay attention to verb conjugations.',
      attachments: ['priya_quiz.pdf']
    },
    {
      id: 3,
      studentName: 'Amit Kumar',
      studentId: '6B001',
      submittedAt: '2024-01-17 10:15',
      status: 'submitted',
      attachments: ['amit_essay.pdf']
    }
  ];

  const subjects = ['Punjabi', 'Hindi', 'Math', 'English', 'Science'];
  const classes = ['Class 5A', 'Class 6B', 'Class 7A', 'Class 8B'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'graded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Assignment Management</h2>
          <p className="text-muted-foreground">Create, manage, and grade assignments</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-edu-blue hover:bg-edu-blue-dark">
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input id="title" placeholder="Enter assignment title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">Maximum Marks</Label>
                  <Input id="maxMarks" type="number" placeholder="100" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter assignment description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea id="instructions" placeholder="Enter detailed instructions" />
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Create Assignment
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assignment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Assignments</p>
                <p className="text-2xl font-bold text-foreground">{assignments.length}</p>
              </div>
              <FileText className="h-8 w-8 text-edu-blue" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-blue-600">
                  {assignments.filter(a => a.status === 'active').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Graded</p>
                <p className="text-2xl font-bold text-green-600">
                  {assignments.filter(a => a.status === 'graded').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(assignments.filter(a => a.averageScore).reduce((acc, a) => acc + (a.averageScore || 0), 0) / assignments.filter(a => a.averageScore).length) || 0}%
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="edu-card-shadow hover:edu-card-shadow-hover edu-transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{assignment.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span>{assignment.subject}</span>
                        <span>•</span>
                        <span>{assignment.class}</span>
                        <span>•</span>
                        <span>{assignment.maxMarks} marks</span>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="font-medium">{assignment.dueDate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Submissions:</span>
                      <span className="font-medium">{assignment.submittedStudents}/{assignment.totalStudents}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress:</span>
                        <span className="font-medium">
                          {Math.round((assignment.submittedStudents / assignment.totalStudents) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(assignment.submittedStudents / assignment.totalStudents) * 100} 
                        className="h-2"
                      />
                    </div>

                    {assignment.averageScore && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Average Score:</span>
                        <span className={`font-medium ${getScoreColor(assignment.averageScore)}`}>
                          {assignment.averageScore}%
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-6">
          <Card className="edu-card-shadow">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-edu-blue-light flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-edu-blue">
                                {submission.studentName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                              <div className="text-sm text-gray-500">{submission.studentId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {assignments.find(a => a.id === 1)?.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {submission.submittedAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getSubmissionStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {submission.score ? (
                            <span className={`text-sm font-medium ${getScoreColor(submission.score)}`}>
                              {submission.score}%
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentManagement;

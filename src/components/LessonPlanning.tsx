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
import { 
  BookOpen, Plus, Calendar, Clock, Users, Target, 
  FileText, Video, Image, Link, Download, Edit, Trash2,
  CheckCircle, AlertCircle, Play
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  subject: string;
  class: string;
  duration: number;
  objectives: string[];
  resources: Resource[];
  status: 'draft' | 'scheduled' | 'completed';
  scheduledDate: string;
  createdAt: string;
  description: string;
}

interface Resource {
  id: number;
  name: string;
  type: 'video' | 'document' | 'image' | 'link';
  url: string;
  size?: string;
}

const LessonPlanning = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: 'Introduction to Punjabi Grammar',
      subject: 'Punjabi',
      class: 'Class 5A',
      duration: 45,
      objectives: [
        'Understand basic Punjabi sentence structure',
        'Learn common Punjabi verbs',
        'Practice pronunciation'
      ],
      resources: [
        { id: 1, name: 'Grammar Rules PDF', type: 'document', url: '#', size: '2.3 MB' },
        { id: 2, name: 'Pronunciation Video', type: 'video', url: '#', size: '15 MB' }
      ],
      status: 'scheduled',
      scheduledDate: '2024-01-15',
      createdAt: '2024-01-10',
      description: 'A comprehensive introduction to Punjabi grammar basics for beginners.'
    },
    {
      id: 2,
      title: 'Hindi Essay Writing Techniques',
      subject: 'Hindi',
      class: 'Class 6B',
      duration: 60,
      objectives: [
        'Learn essay structure',
        'Practice descriptive writing',
        'Improve vocabulary'
      ],
      resources: [
        { id: 3, name: 'Sample Essays', type: 'document', url: '#', size: '1.8 MB' },
        { id: 4, name: 'Writing Tips Video', type: 'video', url: '#', size: '12 MB' }
      ],
      status: 'draft',
      scheduledDate: '2024-01-18',
      createdAt: '2024-01-12',
      description: 'Master the art of essay writing in Hindi with practical examples.'
    },
    {
      id: 3,
      title: 'Algebraic Equations',
      subject: 'Math',
      class: 'Class 7A',
      duration: 50,
      objectives: [
        'Solve linear equations',
        'Understand variables',
        'Practice problem-solving'
      ],
      resources: [
        { id: 5, name: 'Practice Problems', type: 'document', url: '#', size: '3.1 MB' },
        { id: 6, name: 'Step-by-step Solutions', type: 'video', url: '#', size: '20 MB' }
      ],
      status: 'completed',
      scheduledDate: '2024-01-12',
      createdAt: '2024-01-08',
      description: 'Introduction to algebraic equations with practical examples.'
    }
  ];

  const subjects = ['Punjabi', 'Hindi', 'Math', 'English', 'Science'];
  const classes = ['Class 5A', 'Class 6B', 'Class 7A', 'Class 8B'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'link': return <Link className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Lesson Planning</h2>
          <p className="text-muted-foreground">Create and manage your lesson plans</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-edu-blue hover:bg-edu-blue-dark">
              <Plus className="h-4 w-4 mr-2" />
              Create Lesson Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Lesson Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input id="title" placeholder="Enter lesson title" />
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
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" placeholder="45" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter lesson description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objectives">Learning Objectives (one per line)</Label>
                <Textarea id="objectives" placeholder="Enter learning objectives" />
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Create Lesson Plan
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

      {/* Lesson Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Lessons</p>
                <p className="text-2xl font-bold text-foreground">{lessons.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-edu-blue" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">
                  {lessons.filter(l => l.status === 'scheduled').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {lessons.filter(l => l.status === 'completed').length}
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
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-orange-600">
                  {lessons.filter(l => l.status === 'draft').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lesson List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="edu-card-shadow hover:edu-card-shadow-hover edu-transition">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{lesson.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{lesson.subject}</span>
                    <span>•</span>
                    <span>{lesson.class}</span>
                    <span>•</span>
                    <span>{lesson.duration} min</span>
                  </div>
                  <Badge className={getStatusColor(lesson.status)}>
                    {lesson.status}
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
              <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Learning Objectives:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {lesson.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-3 w-3 mt-1 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Resources:</h4>
                  <div className="space-y-1">
                    {lesson.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getResourceIcon(resource.type)}
                        <span>{resource.name}</span>
                        {resource.size && <span className="text-xs">({resource.size})</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    Created: {lesson.createdAt}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LessonPlanning;

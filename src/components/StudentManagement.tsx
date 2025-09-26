import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Users, Search, Filter, Plus, Eye, Edit, Trash2, 
  UserCheck, Clock, Award, BookOpen, TrendingUp
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  class: string;
  rollNumber: string;
  score: number;
  attendance: number;
  assignments: number;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
  parentContact: string;
  joinDate: string;
}

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    rollNumber: '',
    class: '',
    parentContact: ''
  });

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Ravi Singh',
      email: 'ravi.singh@example.com',
      class: 'Class 5A',
      rollNumber: '5A001',
      score: 92,
      attendance: 95,
      assignments: 8,
      lastActive: '2 hours ago',
      status: 'active',
      parentContact: '+91 98765 43210',
      joinDate: '2024-01-01'
    },
    {
      id: 2,
      name: 'Priya Kaur',
      email: 'priya.kaur@example.com',
      class: 'Class 5A',
      rollNumber: '5A002',
      score: 88,
      attendance: 98,
      assignments: 7,
      lastActive: '1 day ago',
      status: 'active',
      parentContact: '+91 98765 43211',
      joinDate: '2024-01-01'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      class: 'Class 6B',
      rollNumber: '6B001',
      score: 76,
      attendance: 90,
      assignments: 6,
      lastActive: '3 hours ago',
      status: 'active',
      parentContact: '+91 98765 43212',
      joinDate: '2024-01-02'
    },
    {
      id: 4,
      name: 'Simran Bhatia',
      email: 'simran.bhatia@example.com',
      class: 'Class 6B',
      rollNumber: '6B002',
      score: 94,
      attendance: 100,
      assignments: 9,
      lastActive: '1 hour ago',
      status: 'active',
      parentContact: '+91 98765 43213',
      joinDate: '2024-01-02'
    },
    {
      id: 5,
      name: 'Rajesh Verma',
      email: 'rajesh.verma@example.com',
      class: 'Class 7A',
      rollNumber: '7A001',
      score: 85,
      attendance: 92,
      assignments: 8,
      lastActive: '4 hours ago',
      status: 'inactive',
      parentContact: '+91 98765 43214',
      joinDate: '2024-01-03'
    }
  ]);

  const classes = ['Class 5A', 'Class 6B', 'Class 7A'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.rollNumber || !newStudent.class) {
      return;
    }
    const next: Student = {
      id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
      name: newStudent.name,
      email: newStudent.email,
      class: newStudent.class,
      rollNumber: newStudent.rollNumber,
      score: 0,
      attendance: 0,
      assignments: 0,
      lastActive: 'just now',
      status: 'active',
      parentContact: newStudent.parentContact,
      joinDate: new Date().toISOString().slice(0, 10)
    };
    setStudents(prev => [next, ...prev]);
    setIsAddDialogOpen(false);
    setNewStudent({ name: '', email: '', rollNumber: '', class: '', parentContact: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Student Management</h2>
          <p className="text-muted-foreground">Manage student information and track progress</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-edu-blue hover:bg-edu-blue-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter student name" value={newStudent.name} onChange={(e) => setNewStudent(v => ({...v, name: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" value={newStudent.email} onChange={(e) => setNewStudent(v => ({...v, email: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input id="rollNumber" placeholder="Enter roll number" value={newStudent.rollNumber} onChange={(e) => setNewStudent(v => ({...v, rollNumber: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select value={newStudent.class} onValueChange={(val) => setNewStudent(v => ({...v, class: val}))}>
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
                <Label htmlFor="parentContact">Parent Contact</Label>
                <Input id="parentContact" placeholder="Enter parent contact number" value={newStudent.parentContact} onChange={(e) => setNewStudent(v => ({...v, parentContact: e.target.value}))} />
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  onClick={handleAddStudent}
                >
                  Add Student
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="edu-card-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students by name, email, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-edu-blue" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-edu-green">{students.filter(s => s.status === 'active').length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-edu-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(students.reduce((acc, s) => acc + s.score, 0) / students.length)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card className="edu-card-shadow">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-edu-blue-light flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-edu-blue">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                          <div className="text-xs text-gray-400">Roll: {student.rollNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getScoreColor(student.score)}`}>
                        {student.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.attendance}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastActive}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
};

export default StudentManagement;

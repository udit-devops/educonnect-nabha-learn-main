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
  MessageSquare, Plus, Send, Bell, Users, Calendar, 
  AlertCircle, CheckCircle, Clock, Star, Reply, Forward,
  Mail, Phone, Video, FileText, Image, Link
} from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: 'all' | 'students' | 'parents' | 'teachers';
  status: 'draft' | 'sent' | 'scheduled';
  createdAt: string;
  scheduledFor?: string;
  readCount: number;
  totalRecipients: number;
}

interface Message {
  id: number;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  attachments?: string[];
}

const CommunicationCenter = () => {
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('announcements');

  const announcements: Announcement[] = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      content: 'We are organizing a parent-teacher meeting on Friday, January 15th at 3:00 PM. Please confirm your attendance.',
      priority: 'high',
      targetAudience: 'parents',
      status: 'sent',
      createdAt: '2024-01-10',
      readCount: 45,
      totalRecipients: 60
    },
    {
      id: 2,
      title: 'Holiday Notice',
      content: 'School will be closed on Republic Day (January 26th). Classes will resume on January 27th.',
      priority: 'medium',
      targetAudience: 'all',
      status: 'sent',
      createdAt: '2024-01-12',
      readCount: 120,
      totalRecipients: 150
    },
    {
      id: 3,
      title: 'Exam Schedule',
      content: 'Mid-term examinations will begin next week. Please check the schedule and prepare accordingly.',
      priority: 'high',
      targetAudience: 'students',
      status: 'scheduled',
      createdAt: '2024-01-14',
      scheduledFor: '2024-01-20',
      readCount: 0,
      totalRecipients: 85
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      from: 'Priya Kaur (Parent)',
      to: 'Teacher',
      subject: 'Question about homework',
      content: 'My daughter is having trouble with the math homework. Could you please provide some additional guidance?',
      timestamp: '2024-01-14 14:30',
      status: 'unread',
      priority: 'medium'
    },
    {
      id: 2,
      from: 'Ravi Singh (Student)',
      to: 'Teacher',
      subject: 'Assignment submission',
      content: 'I have submitted my Punjabi essay assignment. Please let me know if you need any clarification.',
      timestamp: '2024-01-14 12:15',
      status: 'read',
      priority: 'low'
    },
    {
      id: 3,
      from: 'Amit Kumar (Parent)',
      to: 'Teacher',
      subject: 'Meeting request',
      content: 'I would like to schedule a meeting to discuss my son\'s progress. When would be convenient for you?',
      timestamp: '2024-01-13 16:45',
      status: 'replied',
      priority: 'high',
      attachments: ['progress_report.pdf']
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-orange-100 text-orange-800';
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-green-100 text-green-800';
      case 'replied': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'all': return <Users className="h-4 w-4" />;
      case 'students': return <MessageSquare className="h-4 w-4" />;
      case 'parents': return <Users className="h-4 w-4" />;
      case 'teachers': return <Users className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Communication Center</h2>
          <p className="text-muted-foreground">Manage announcements, messages, and communication</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-edu-blue hover:bg-edu-blue-dark">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter announcement title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="Enter announcement content" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                        <SelectItem value="teachers">Teachers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule (optional)</Label>
                  <Input id="schedule" type="datetime-local" />
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => setIsAnnouncementDialogOpen(false)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Announcement
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsAnnouncementDialogOpen(false)}
                  >
                    Save as Draft
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Send New Message</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="class">Entire Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter message subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message" rows={4} />
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => setIsMessageDialogOpen(false)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsMessageDialogOpen(false)}
                  >
                    Save Draft
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Announcements</p>
                <p className="text-2xl font-bold text-foreground">{announcements.length}</p>
              </div>
              <Bell className="h-8 w-8 text-edu-blue" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread Messages</p>
                <p className="text-2xl font-bold text-red-600">
                  {messages.filter(m => m.status === 'unread').length}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-orange-600">
                  {announcements.filter(a => a.status === 'scheduled').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="edu-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
                <p className="text-2xl font-bold text-green-600">
                  {announcements.reduce((acc, a) => acc + a.totalRecipients, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="edu-card-shadow hover:edu-card-shadow-hover edu-transition">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <Badge className={getPriorityColor(announcement.priority)}>
                          {announcement.priority}
                        </Badge>
                        <Badge className={getStatusColor(announcement.status)}>
                          {announcement.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {getAudienceIcon(announcement.targetAudience)}
                          <span className="capitalize">{announcement.targetAudience}</span>
                        </div>
                        <span>•</span>
                        <span>Created: {announcement.createdAt}</span>
                        {announcement.scheduledFor && (
                          <>
                            <span>•</span>
                            <span>Scheduled: {announcement.scheduledFor}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Reply className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Forward className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{announcement.content}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        Read: {announcement.readCount}/{announcement.totalRecipients}
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-edu-blue h-2 rounded-full" 
                          style={{ width: `${(announcement.readCount / announcement.totalRecipients) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <Card className="edu-card-shadow">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {messages.map((message) => (
                      <tr key={message.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-edu-blue-light flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-edu-blue">
                                {message.from.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{message.from}</div>
                              <div className="text-sm text-gray-500">{message.to}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{message.subject}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{message.content}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getPriorityColor(message.priority)}>
                            {message.priority}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getStatusColor(message.status)}>
                            {message.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {message.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Reply className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Forward className="h-4 w-4" />
                            </Button>
                            {message.attachments && (
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            )}
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

export default CommunicationCenter;

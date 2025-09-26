import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';

const Dashboard = () => {
  // Sample quiz data
  const quizData = [
    { name: 'Quiz 1', score: 85, students: 24 },
    { name: 'Quiz 2', score: 72, students: 28 },
    { name: 'Quiz 3', score: 94, students: 22 },
    { name: 'Quiz 4', score: 88, students: 26 },
    { name: 'Quiz 5', score: 76, students: 30 }
  ];

  // Subject distribution data
  const subjectData = [
    { name: 'Punjabi', value: 40, color: '#3b82f6' },
    { name: 'Hindi', value: 35, color: '#10b981' },
    { name: 'Math', value: 25, color: '#f59e0b' }
  ];

  // Key metrics
  const metrics = [
    {
      title: 'Total Students',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'text-edu-blue'
    },
    {
      title: 'Active Lessons',
      value: '24',
      change: '+3',
      icon: BookOpen,
      color: 'text-edu-green'
    },
    {
      title: 'Avg. Score',
      value: '83%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-orange-500'
    },
    {
      title: 'Certificates',
      value: '47',
      change: '+8',
      icon: Award,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-light/10 to-edu-green-light/10 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Teacher Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor student progress and analyze learning outcomes
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card 
              key={index} 
              className="edu-card-shadow hover:edu-card-shadow-hover edu-transition animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {metric.value}
                    </p>
                    <p className="text-sm text-edu-green font-medium">
                      {metric.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                    <metric.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quiz Scores Chart */}
          <Card className="edu-card-shadow animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-edu-blue">Quiz Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quizData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value, name) => [
                      `${value}%`, 
                      name === 'score' ? 'Average Score' : 'Students'
                    ]}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="hsl(var(--edu-blue))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Distribution */}
          <Card className="edu-card-shadow animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="text-edu-green">Subject Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
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

        {/* Recent Activity */}
        <Card className="mt-8 edu-card-shadow animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  student: 'Ravi Singh',
                  action: 'Completed Punjabi Lesson 3',
                  score: '92%',
                  time: '2 hours ago'
                },
                {
                  student: 'Priya Kaur',
                  action: 'Started Hindi Grammar Module',
                  score: 'In Progress',
                  time: '4 hours ago'
                },
                {
                  student: 'Amit Kumar',
                  action: 'Achieved Certificate in Basic Math',
                  score: '88%',
                  time: '1 day ago'
                },
                {
                  student: 'Simran Bhatia',
                  action: 'Submitted Quiz 5',
                  score: '76%',
                  time: '1 day ago'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-edu-blue-light flex items-center justify-center">
                      <span className="text-xs font-medium text-edu-blue">
                        {activity.student.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.student}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-edu-green">{activity.score}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
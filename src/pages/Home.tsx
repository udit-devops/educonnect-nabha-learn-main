import { BookOpen, Monitor, Globe, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeHero from '@/components/ThreeHero';

const Home = () => {
  console.log('Home component rendering...');
  
  const features = [
    {
      icon: Monitor,
      title: "Offline-First Access",
      description: "Learn anytime, anywhere without internet connectivity"
    },
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description: "Engaging content with real-time feedback and progress tracking"
    },
    {
      icon: Globe,
      title: "Punjabi & Hindi Content",
      description: "Native language support for better understanding"
    },
    {
      icon: BarChart3,
      title: "Teacher Dashboard",
      description: "Comprehensive analytics and student progress monitoring"
    }
  ];

  console.log('Home render method executing...');

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-10">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">
              Learn in 3D. Teach with Insight.
            </h1>
            <p className="text-muted-foreground mb-6">
              An immersive learning platform for schools with analytics for teachers and engaging content for students.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/lesson" 
                className="bg-edu-blue text-white px-6 py-3 rounded-lg hover:bg-edu-blue-dark edu-transition"
              >
                Start Learning
              </Link>
              <Link 
                to="/teacher-dashboard" 
                className="bg-edu-green text-white px-6 py-3 rounded-lg hover:bg-edu-green-dark edu-transition"
              >
                Teacher Dashboard
              </Link>
            </div>
          </div>
          <ThreeHero />
        </div>

        {/* Platform Features */}
        <div className="bg-gradient-to-br from-edu-blue-light/40 to-edu-green-light/40 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-card text-card-foreground p-4 rounded-lg edu-card-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium">{feature.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-green-600 font-medium text-lg">
            ✅ If you can see this, the app is working correctly!
          </p>
          <p className="text-gray-600 mt-2">
            Try navigating to different pages using the navbar above.
          </p>
        </div>
        
        {/* Quick Navigation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/lesson" className="block p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <h4 className="font-semibold text-yellow-800">📚 Sample Lesson</h4>
            <p className="text-sm text-yellow-700">Try our interactive Punjabi lesson</p>
          </Link>
          <Link to="/dashboard" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <h4 className="font-semibold text-purple-800">📊 Teacher Dashboard</h4>
            <p className="text-sm text-purple-700">View student progress and analytics</p>
          </Link>
          <Link to="/about" className="block p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
            <h4 className="font-semibold text-indigo-800">ℹ️ About Project</h4>
            <p className="text-sm text-indigo-700">Learn about our mission and roadmap</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, Eye, Calendar } from 'lucide-react';

const About = () => {
  const visionPoints = [
    "Bridge the digital divide in rural education",
    "Empower teachers with modern educational tools",
    "Preserve and promote local languages and culture",
    "Create sustainable learning ecosystems"
  ];

  const missionPoints = [
    "Develop offline-first educational technology",
    "Provide multilingual content in Punjabi and Hindi",
    "Train teachers in digital pedagogy",
    "Build community partnerships for long-term success"
  ];

  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Foundation",
      period: "Q1-Q2 2024",
      description: "Pilot program in 5 schools with basic offline functionality",
      status: "completed"
    },
    {
      phase: "Phase 2", 
      title: "Expansion",
      period: "Q3-Q4 2024",
      description: "Scale to 25 schools with enhanced interactive features",
      status: "current"
    },
    {
      phase: "Phase 3",
      title: "Innovation",
      period: "Q1-Q2 2025", 
      description: "AI-powered personalized learning and community features",
      status: "planned"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-light/10 to-edu-green-light/10 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About EduConnect Nabha
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforming rural education through innovative technology and 
            culturally relevant digital learning experiences.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <Card className="edu-card-shadow animate-slide-up">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-edu-blue-light rounded-full flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-edu-blue" />
              </div>
              <CardTitle className="text-2xl text-edu-blue">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {visionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-edu-green mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="edu-card-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-edu-green-light rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-edu-green" />
              </div>
              <CardTitle className="text-2xl text-edu-green">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {missionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-edu-blue mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Roadmap */}
        <Card className="edu-card-shadow animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-2xl text-foreground">Implementation Roadmap</CardTitle>
            <p className="text-muted-foreground">
              Our three-phase approach to transforming rural education
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-edu-blue via-edu-green to-orange-400"></div>
              
              <div className="space-y-8">
                {roadmapPhases.map((phase, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Timeline Dot */}
                    <div className={`
                      relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                      ${phase.status === 'completed' 
                        ? 'bg-edu-green' 
                        : phase.status === 'current' 
                        ? 'bg-edu-blue animate-pulse-gentle' 
                        : 'bg-gray-400'
                      }
                    `}>
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {phase.phase}: {phase.title}
                        </h3>
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${phase.status === 'completed' 
                            ? 'bg-edu-green-light text-edu-green-dark' 
                            : phase.status === 'current' 
                            ? 'bg-edu-blue-light text-edu-blue-dark' 
                            : 'bg-gray-100 text-gray-600'
                          }
                        `}>
                          {phase.status === 'completed' ? 'Completed' : 
                           phase.status === 'current' ? 'In Progress' : 'Planned'}
                        </span>
                      </div>
                      <p className="text-sm text-edu-blue font-medium mb-2">
                        {phase.period}
                      </p>
                      <p className="text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: "5", label: "Pilot Schools", subtitle: "Currently Active" },
            { number: "200+", label: "Students", subtitle: "Learning Daily" },
            { number: "25", label: "Teachers", subtitle: "Trained & Certified" }
          ].map((stat, index) => (
            <Card key={index} className="text-center edu-card-shadow animate-slide-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-edu-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.subtitle}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-edu-blue to-edu-green text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Join Our Mission
              </h2>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Help us bridge the digital divide and create equal educational 
                opportunities for all children in rural communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-white text-edu-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Partner With Us
                </button>
                <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
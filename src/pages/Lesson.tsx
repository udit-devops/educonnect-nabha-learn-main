import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const Lesson = () => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [attempts, setAttempts] = useState(0);

  const correctAnswers = ['ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'sat sri akal', 'namaste', 'ਨਮਸਤੇ'];
  
  const checkAnswer = () => {
    const userAnswer = answer.toLowerCase().trim();
    const isCorrect = correctAnswers.some(correct => 
      userAnswer.includes(correct.toLowerCase())
    );

    setAttempts(prev => prev + 1);

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: 'Correct! Well done! 🎉'
      });
    } else {
      setFeedback({
        type: 'error',
        message: attempts >= 2 
          ? 'Try "Sat Sri Akal" (ਸਤ ਸ੍ਰੀ ਅਕਾਲ) - the traditional Punjabi greeting!'
          : 'Try again! Think about traditional Punjabi greetings.'
      });
    }
  };

  const resetLesson = () => {
    setAnswer('');
    setFeedback({ type: null, message: '' });
    setAttempts(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer.trim()) {
      checkAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-light/10 to-edu-green-light/10 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sample Punjabi Lesson
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn basic Punjabi greetings through interactive practice
          </p>
        </div>

        <Card className="edu-card-shadow animate-slide-up">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-edu-blue">
              Translation Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question */}
            <div className="text-center p-6 bg-edu-blue-light/30 rounded-lg">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Translate "Hello" into Punjabi
              </h2>
              <p className="text-muted-foreground">
                Type your answer in English or Punjabi script
              </p>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Type your answer here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg py-3 px-4"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={checkAnswer}
                  disabled={!answer.trim()}
                  className="flex-1 bg-edu-blue hover:bg-edu-blue-dark"
                >
                  Check Answer
                </Button>
                <Button 
                  onClick={resetLesson}
                  variant="outline"
                  className="border-edu-green text-edu-green hover:bg-edu-green hover:text-white"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Feedback */}
            {feedback.message && (
              <div className={`
                flex items-center gap-3 p-4 rounded-lg animate-fade-in
                ${feedback.type === 'success' 
                  ? 'bg-edu-green-light text-edu-green-dark' 
                  : 'bg-red-50 text-red-700'
                }
              `}>
                {feedback.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <span className="font-medium">{feedback.message}</span>
              </div>
            )}

            {/* Progress Indicator */}
            <div className="text-center text-sm text-muted-foreground">
              Attempts: {attempts}
              {attempts > 0 && (
                <span className="ml-2">
                  {feedback.type === 'success' ? '✓ Completed' : '• Keep trying!'}
                </span>
              )}
            </div>

            {/* Hint Section */}
            {attempts === 0 && (
              <div className="bg-edu-green-light/20 p-4 rounded-lg">
                <h4 className="font-semibold text-edu-green-dark mb-2">💡 Hint:</h4>
                <p className="text-sm text-muted-foreground">
                  Think about the traditional greeting used by Sikhs in Punjab. 
                  It's a respectful way to say hello that acknowledges the divine.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Learning Resources */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-edu-blue-light/20 to-edu-green-light/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Did you know?
              </h3>
              <p className="text-muted-foreground">
                "Sat Sri Akal" (ਸਤ ਸ੍ਰੀ ਅਕਾਲ) literally means "Truth is the timeless one" 
                and is the most common greeting in Punjabi culture.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
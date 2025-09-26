import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState as useReactState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [role, setRole] = useReactState<'student' | 'teacher'>('student');

  const handleLogin = () => {
    if (!email || !password) return;
    localStorage.setItem('ec_auth', JSON.stringify({ email, role }));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Illustration panel */}
        <div className="relative bg-card rounded-2xl edu-card-shadow overflow-hidden min-h-[420px] hidden lg:block">
          <img src="/login-hero.png" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.svg'}} alt="study items" className="absolute inset-0 w-full h-full object-cover opacity-95" />
          {/* Pop-out character */}
          <img src="/login-character.png" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} alt="character" className="absolute right-[-20px] bottom-[-10px] h-[95%] object-contain drop-shadow-xl animate-float-slow" />
          {/* Overlap mask to simulate popping out of panel */}
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-transparent rounded-tl-3xl" />
        </div>

        {/* Form card styled like reference */}
        <Card className="edu-card-shadow overflow-hidden">
          <div className="px-6 pt-5 pb-3 bg-edu-blue text-white text-center font-semibold">LOG IN</div>
          <CardContent className="space-y-5 pt-6">
            {/* Role segmented */}
            <div className="mx-auto mb-2 flex w-max items-center gap-1 rounded-full border px-1 py-1 bg-background">
              <button onClick={()=>setRole('student')} className={`px-4 py-1.5 text-sm rounded-full ${role==='student'?'bg-edu-blue text-white':'text-foreground'}`}>Student</button>
              <button onClick={()=>setRole('teacher')} className={`px-4 py-1.5 text-sm rounded-full ${role==='teacher'?'bg-edu-blue text-white':'text-foreground'}`}>Teacher</button>
            </div>
            <div>
              <label className="text-sm">Email Address</label>
              <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="jane@school.com" />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <div className="text-right text-xs text-muted-foreground">Forgot Password?</div>
            <Button className="w-full bg-edu-blue hover:bg-edu-blue-dark" onClick={handleLogin}>Log in</Button>
            <p className="text-sm text-muted-foreground text-center">
              No account? <Link to="/signup" className="text-edu-blue">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;



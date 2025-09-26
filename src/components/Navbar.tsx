import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wifi, WifiOff } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOnline, setIsOnline] = useState(true);
  const location = useLocation();

  // Simulate connectivity status toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(prev => Math.random() > 0.1 ? true : !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/lesson', label: 'Lesson' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/teacher-dashboard', label: 'Teacher Dashboard' },
    { to: '/about', label: 'About' },
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo size={28} />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                variant={isActiveLink(link.to) ? "default" : "ghost"}
                asChild
                className={`
                  ${isActiveLink(link.to) 
                    ? 'bg-edu-blue text-white' 
                    : 'text-foreground hover:text-edu-blue'
                  }
                `}
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}
          </div>

          {/* Status Indicator + Theme Toggle */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            isOnline 
              ? 'bg-edu-green-light text-edu-green-dark' 
              : 'bg-red-100 text-red-700'
          }`}>
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4" />
                <span>Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span>Offline</span>
              </>
            )}
          </div>

          <ThemeToggle />

          {/* Auth Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Log in</Link>
            <Link to="/signup" className="text-sm px-3 py-1.5 rounded-md bg-edu-blue text-white hover:bg-edu-blue-dark">Sign up</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Open menu</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t py-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                variant={isActiveLink(link.to) ? "default" : "ghost"}
                asChild
                className={`
                  justify-start
                  ${isActiveLink(link.to) 
                    ? 'bg-edu-blue text-white' 
                    : 'text-foreground hover:text-edu-blue'
                  }
                `}
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
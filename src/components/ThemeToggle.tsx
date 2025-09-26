import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const nextDark = !isDark;
    setIsDark(nextDark);
    root.classList.toggle('dark', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle} aria-label="Toggle theme">
      {isDark ? '🌙' : '☀️'}
    </Button>
  );
};

export default ThemeToggle;



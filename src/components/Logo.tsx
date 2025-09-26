type LogoProps = {
  size?: number;
};

const Logo = ({ size = 28 }: LogoProps) => {
  const stroke = "#0ea5a4"; // tech-teal curve
  const accent = "#f97316"; // vibrant orange accent

  return (
    <div className="flex items-center gap-2 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EduConnect logo"
      >
        <path
          d="M14 38c6 10 20 12 28-2"
          fill="none"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xl font-extrabold tracking-tight">
        <span style={{ color: accent }}>EduConnect</span>
        <span className="text-foreground"> Nabha</span>
      </span>
    </div>
  );
};

export default Logo;



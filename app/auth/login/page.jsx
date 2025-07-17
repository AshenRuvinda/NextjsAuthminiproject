// login page
import AnimatedBackground from '../../../components/AnimatedBackground';
import LoginForm from '../../../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
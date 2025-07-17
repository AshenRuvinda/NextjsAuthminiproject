// register page 
import AnimatedBackground from '../../../components/AnimatedBackground';
import RegisterForm from '../../../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
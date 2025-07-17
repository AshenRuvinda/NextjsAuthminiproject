// login page
import AnimatedBackground from '../../../components/AnimatedBackground';
import LoginForm from '../../../components/LoginForm';

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#FCFBF7' }}>
      <AnimatedBackground style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoginForm />
      </div>
    </div>
  );
}
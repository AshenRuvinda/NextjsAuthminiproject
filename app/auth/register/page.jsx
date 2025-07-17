// register page 
import AnimatedBackground from '../../../components/AnimatedBackground';
import RegisterForm from '../../../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#FCFBF7' }}>
      <AnimatedBackground style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <RegisterForm />
      </div>
    </div>
  );
}
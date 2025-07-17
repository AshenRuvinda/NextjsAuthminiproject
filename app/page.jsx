// home page 
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Auth App</h1>
      <div className="space-x-4">
        <Link href="/auth/login">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </Link>
        <Link href="/auth/register">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
import Link from 'next/link';
import LoginFormViews from '@/views/Auth/Login';

const LoginPages = () => {
  return (
    <div className="flex flex-col justify-center py-10 bg-gray-50 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-4xl/9 font-bold tracking-tight text-gray-900">SmartShop</h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <LoginFormViews />
    </div>
  );
}

export default LoginPages;
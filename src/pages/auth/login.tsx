import Link from 'next/link';
import LoginFormViews from '@/views/Auth/Login';

const LoginPages = () => {
  return (
    <div className="flex flex-col justify-center py-10 bg-gray-50 min-h-screen">
      <LoginFormViews />
    </div>
  );
}

export default LoginPages;
import RegisterFormViews from '@/views/Auth/Register';

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center py-10 bg-gray-50 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-4xl/9 font-bold tracking-tight text-gray-900">SmartShop</h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your account</h2>
      </div>
      <RegisterFormViews />
    </div>
  );
}

export default RegisterPage;
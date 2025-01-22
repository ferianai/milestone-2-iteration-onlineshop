import RegisterFormViews from '@/views/Auth/Register';

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center py-10 bg-gray-50 min-h-screen">
      <RegisterFormViews />
    </div>
  );
}

export default RegisterPage;
import Link from 'next/link';

const LoginPages = () => {
  return (
    <div>
      <h1>Login</h1>
      don't have an account? <Link href={"/register"}>Register</Link>
    </div>
  );
}

export default LoginPages;
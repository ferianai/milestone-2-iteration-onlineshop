import Link from 'next/link';
import style from './Navbar.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        // Get user data from localStorage when the component mounts
        setEmail(localStorage.getItem('user_email'));
        setName(localStorage.getItem('user_name'));
    }, []);

    const handleLogout = () => {
        // Clear localStorage items
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
    
        // Redirect to the login page after logging out
        router.push('/auth/login');
    };

    return (
        <nav className={`${style.navbar} bg-blue-500`}>
            <ul>
                <li>
                    <Link href={"/"}>ShopSmart</Link>
                </li>
                <li>
                    <Link href={"/about"}>About</Link>
                </li>
                <li>
                    <Link href={"/product"}>Product</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href={"/cart"}>
                    <span>
                        <i className="fas fa-shopping-cart"></i> {/* FontAwesome cart icon */}
                    </span>
                    </Link>
                </li>
                {name && (
                <li>
                    <span className='font-bold'>{name}</span>
                </li>
                )}
                <li>
                {email ? (
                    <button onClick={handleLogout} className="font-semibold">Logout</button>
                ) : (
                    <Link href="/auth/login" className="font-semibold">Login <i className="fa-solid fa-arrow-right"></i></Link>
                )}
                </li>

            </ul>
        </nav>
    )
}

export default Navbar;
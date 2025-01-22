import Link from 'next/link';
import style from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={`${style.navbar} navbar bg-blue-500`}>
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
                <Link href={"/auth/login"}>login</Link>
            </li>
            <li>
                <Link href={"/cart"}>cart</Link>
            </li>
       </ul>
    </nav>
  )
}

export default Navbar;
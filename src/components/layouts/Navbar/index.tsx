import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
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
                <Link href={"/login"}>login</Link>
            </li>
            <li>
                <Link href={"/cart"}>cart</Link>
            </li>
       </ul>
    </nav>
  );
}

export default Navbar;
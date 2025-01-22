import Navbar from "../Navbar";
import { useRouter } from "next/router";

type AppShellProps = {
    children: React.ReactNode;
};

const disableNavbar = ["/auth/login", "/auth/register"];

const AppShell: React.FC<AppShellProps> = (props: AppShellProps ) => {
    const { children } = props;
    const { pathname } = useRouter();

    return (
        <main className='app-shell'>
            {!disableNavbar.includes(pathname) && <Navbar />}
            <div className='content'>
                {children}
            </div>
            {/* <div className='content'>Footer</div> */}
        </main>
    );
}

export default AppShell;
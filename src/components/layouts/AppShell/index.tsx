import Navbar from "../Navbar";

type AppShellProps = {
    children: React.ReactNode;
};

const AppShell: React.FC<AppShellProps> = (props: AppShellProps ) => {
    const { children } = props;

    return (
        <main className='app-shell'>
            <Navbar />
            {children}
        </main>
    );
}

export default AppShell;
import styles from "@/styles/404.module.scss";
import Image from "next/image";


const Custom404 = () => {
    return (
        <div className={styles.error}>
            <Image src="/notfound.png" alt="404" width={200} height={200} priority={true} className={styles.error__image}/>  
            <h1>404 | Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default Custom404;
import { useRouter } from 'next/router';

const DetailProductPage = () => {    
    const router = useRouter();
    const { id } = router.query;
   
    return (
        <div>
            <h1>Detail Product Page</h1>
            <p>Product : {id} </p>
        </div>
    )
}   

export default DetailProductPage;
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const PaymentSuccessViews: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    // Ensure this component only runs on the client side
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Render nothing on the server side
    if (!isClient) {
        return null;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-center text-green-600">Payment Successful!</h1>
            <div className="text-center mb-6">
                <p>Your payment has been successfully processed. Thank you for your purchase!</p>
                <p>If you have any questions, feel free to contact support.</p>
            </div>

            {/* Button to navigate back to the home page */}
            <div className="text-center">
                <Link href="/product" passHref>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Go to Product
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccessViews;

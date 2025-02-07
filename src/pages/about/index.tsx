import React from "react";

const AboutPage = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center">
        {/* Header */}
        <header className="w-full bg-gray-100 text-black py-8 text-center text-6xl font-bold">
            About ShopSmart
        </header>

        {/* Vision & Mission Section */}
        <section className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
            <h2 className="text-4xl font-semibold mb-4">Our Vision & Mission</h2>
            <p className="text-lg text-center max-w-4xl">
            At ShopSmart, our vision is to revolutionize online shopping by providing top-quality products at unbeatable prices. 
            Our mission is to create a seamless and enjoyable shopping experience, ensuring customer satisfaction with every purchase.
            </p>
        </section>

        {/* Our Team Section */}
        <section className="w-full min-h-screen flex flex-col justify-center items-center bg-white p-8">
            <h2 className="text-4xl font-semibold mb-4">Meet Our Team</h2>
            <p className="text-lg text-center max-w-4xl">
            Our dedicated team at ShopSmart is committed to delivering the best shopping experience. 
            From product sourcing to customer support, we work together to ensure excellence.
            </p>
        </section>
        </div>
    );
};

export default AboutPage;

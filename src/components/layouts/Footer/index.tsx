import React from "react";
import Link from "next/link"; 
import styles from "./Footer.module.css"; 

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    };

    return (
        <div className="bg-gray-800">
        <div className={`${styles.footer}` }>
            {/* ShopSmart Description */}
            <div className={styles.footerSection}>
            <h2 className="text-xl font-bold mb-2">ShopSmart</h2>
            <p>Online Store: Shopping Made Simple, Smart & Affordable.</p>
            </div>

            {/* Help Section */}
            <div className={styles.footerSection}>
            <h3 className="text-lg font-semibold mb-2">Help</h3>
            <ul>
                <li>Telephone: 031-1-876-876</li>
                <li>Email: customer.care@shopsmart.com</li>
                <li>
                <Link href="/help" className="text-blue-400">
                    Help Page
                </Link>
                </li>
                <li>ShopSmartCare</li>
                <li>
                Consumer Complaints Service of the Directorate General of Consumer
                Protection and Trade Order, Ministry of Trade of the Republic of
                Indonesia
                </li>
            </ul>
            </div>

            {/* ShopSmart Info */}
            <div className={styles.footerSection}>
            <h3 className="text-lg font-semibold mb-2">ShopSmart Info</h3>
            <ul>
                <li>
                <Link href="/about" className="text-blue-400">
                    About ShopSmart
                </Link>
                </li>
                <li>
                <Link href="/blog" className="text-blue-400">
                    ShopSmart Friends Blog
                </Link>
                </li>
                <li>
                <Link href="/press" className="text-blue-400">
                    Press Release
                </Link>
                </li>
                <li>
                <Link href="/news" className="text-blue-400">
                    Latest News
                </Link>
                </li>
                <li>
                <Link href="/careers" className="text-blue-400">
                    Career
                </Link>
                </li>
                <li>
                <Link href="/terms" className="text-blue-400">
                    Terms & Privacy Policy
                </Link>
                </li>
            </ul>
            </div>

            {/* Security & Privacy */}
            <div className={styles.footerSection}>
            <h3 className="text-lg font-semibold mb-2">Security & Privacy</h3>
            <div className={styles.certificates}>
                <img
                className="pb-4"
                src="https://www.static-src.com/siva/asset/11_2024/ISO-27001.jpg?w=100"
                alt="SSL Certificate"
                />
                <img
                className="pb-4"
                src="https://www.static-src.com/siva/asset/11_2024/ISO-27701.jpg?w=100"
                alt="PCI DSS Certificate"
                />
                <img
                className="pb-4"
                src="https://www.static-src.com/siva/asset/11_2024/ceritpedia.jpg?w=100"
                alt="GDPR Certificate"
                />
            </div>
            </div>

            {/* Follow Us */}
            <div className={styles.footerSection}>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <p>Stay connected with ShopSmart on social media!</p>
            </div>

            {/* Scroll to Top Button */}
            <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-blue-300 text-white text-4xl p-4 rounded-md shadow-lg hover:bg-blue-600 transition"
            title="Back to Top"
            >
            ↑
            </button>
        </div>

        {/* Footer Bottom */}
        <div className={`${styles.footerBottom} text-center mt-4`}>
            <p>
            ShopSmart © 2025 | Endless Choices, One Online Store. All Rights
            Reserved
            </p>
            <p>
            Created by:{" "}
            <Link
                href="https://github.com/Ferianai"
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
            >
                @Ferianai
            </Link>
            </p>
        </div>
        </div>
    );
};

export default Footer;

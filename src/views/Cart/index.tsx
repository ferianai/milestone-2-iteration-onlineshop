import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext"; 
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Cart.module.css"; 

const CartViews: React.FC = () => {
    const { cart, removeFromCart, updateCartQuantity, clearCart } = useCart();
    const router = useRouter();
    
    const [isClient, setIsClient] = useState(false); // State to check if we're on the client
    const [userEmail, setUserEmail] = useState<string | null>(null); // State for localStorage user email

    // This effect ensures the code runs only on the client
    useEffect(() => {
        setIsClient(true);
        setUserEmail(localStorage.getItem("user_email"));
    }, []);

    // Remove product from cart
    const handleRemoveFromCart = (id: number) => {
        removeFromCart(id);
    };

    // Increase product quantity
    const handleIncreaseQuantity = (productId: number) => {
        const product = cart.find((item) => item.id === productId);
        if (product) {
            updateCartQuantity(productId, product.quantity + 1);
        }
    };

    // Decrease product quantity
    const handleDecreaseQuantity = (productId: number) => {
        const product = cart.find((item) => item.id === productId);
        if (product && product.quantity > 1) {
            updateCartQuantity(productId, product.quantity - 1);
        } else {
            handleRemoveFromCart(productId);
        }
    };

    // Calculate total price
    const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    // Handle checkout process
    const handleCheckout = () => {
        if (cart.length > 0) {
            clearCart();
            alert("Thank you for your purchase!");
            router.push("/payment");
        }
    };

    // Avoid rendering until the client-side setup is complete
    if (!isClient) {
        return null; // Render nothing initially on the server
    }

    return (
        <div className={styles.cartContainer}>
            <h1 className="text-3xl font-bold mb-4 text-center">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-600 mt-4">Your cart is empty</p>
            ) : (
                <div className={styles.cartItems}>
                    {cart.map((product) => (
                        <div key={product.id} className={styles.cartItem}>
                            <img className={styles.cartItemImage} src={product.images[0]} alt={product.title} />
                            <div className={styles.cartItemDetails}>
                                <h2>{product.title}</h2>
                                <p>${product.price}</p>
                                <div className={styles.cartItemActions}>
                                    <button onClick={() => handleRemoveFromCart(product.id)} className="text-red-600">- Remove</button>
                                    <div className={styles.quantity}>
                                        <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className={styles.cartSummary}>
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    <div className={styles.checkoutButton}>
                        {userEmail ? (
                            <button onClick={handleCheckout}>Checkout</button>
                        ) : (
                            <Link href="/login">
                                <a>Login to Checkout</a>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartViews;

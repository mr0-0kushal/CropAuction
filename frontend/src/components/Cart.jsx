import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems, reset } from "../store/cart/cartSlice";
import axios from "axios";
import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const [cartItem, setCartItem] = useState();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const fetchStripe = async () => {
      const stripe = await loadStripe(
        "pk_test_51P5t81Lvvxf0OOpItZ5a94EMI92eFidBTy8oWVF7XTsHTwu17Q9BB292AQjV6s3fjSoWdp60vlG1jG090s6QgDm100UKAL5SIR"
      );
      setStripe(stripe);
    };

    fetchStripe();
  }, []);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    if (cartItems) {
      setCartItem(cartItems);
    }
  }, [cartItems]);

  const redirectToCheckout = async (product) => {
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.startingPrice * 100,
        },
        quantity: 1,
      },
    ];
    const sendProductData = { id: product._id, lineItems: lineItems };
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/payments/checkout",
      {
        sendProductData,
      },
      {
        withCredentials: true,
      }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <div className="px-7 py-4 w-full bg-[#E8F5E9] text-[#1B3D1B] rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <FaShoppingCart className="text-[#4CAF50] text-2xl" />
        <h2 className="text-[#1B3D1B] font-bold text-xl border-b border-[#4CAF50] pb-3">
          Your Cart
        </h2>
      </div>
      
      {cartItem?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <FaShoppingCart className="text-[#4CAF50] text-6xl mb-4" />
          <p className="text-[#1B3D1B] text-lg">Your cart is empty</p>
          <Link 
            to="/" 
            className="mt-4 px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#2E7D32] transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        cartItem?.map((item) => (
          <div
            key={item._id}
            className="flex flex-col gap-4 border-2 border-[#4CAF50] rounded-xl p-6 mb-6 bg-white shadow-lg"
          >
            {item.products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col justify-between gap-6 p-4 md:flex-row items-start md:items-center border-b border-[#4CAF50] last:border-0"
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="w-[100px] h-[100px] rounded-lg object-cover border-2 border-[#4CAF50]"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-[#1B3D1B]">{product.name}</h3>
                    <p className="text-[#4CAF50] font-semibold">${product.startingPrice}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link
                    to={`/single-auction-detail/${product._id}`}
                    className="px-4 py-2 text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white border-2 border-[#4CAF50] rounded-lg transition-all"
                  >
                    View Product
                  </Link>
                  <button
                    className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#2E7D32] transition-all font-semibold"
                    onClick={() => redirectToCheckout(product)}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router";
import { userRequest } from "../requestMethods";

const Success = () => {
  const location = useLocation();
  const history = useHistory();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  const handleGoToHomepage = () => {
    history.push("/"); // Replace "/" with the path to your homepage if different
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button
        style={{
          padding: 10,
          marginTop: 20,
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onClick={handleGoToHomepage}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;

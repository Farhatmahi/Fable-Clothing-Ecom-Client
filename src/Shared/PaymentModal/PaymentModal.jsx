import React, { useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";

const PaymentModal = ({ product }) => {
  const { user } = useContext(AuthContext);

  const { product_name, product_price, _id } = product;
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const price = parseInt(product_price);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://fable-server-farhatmahi.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("33", data.clientSecret)
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const stripe = useStripe();
  const elements = useElements();
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);

      return;
    }
    // console.log('Payment Intent ',paymentIntent);

    if (paymentIntent.status === "succeeded") {
      const payment = {
        user: user?.email,
        product_price: product_price,
        transactionId: paymentIntent.id,
        purchased_Id: _id,
      };

      fetch("https://fable-server-farhatmahi.vercel.app/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            toast.success(`Congratulation, your payment succeeded`, {
              style: {
                padding: "16px",
                backgroundColor: "#000000",
                color: "#ffffff",
                borderRadius: "0",
              },
              iconTheme: {
                primary: "#ffffff",
                secondary: "#000000",
              },
            });
            setSuccess("Congratulation, your payment succeeded");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handlePayment} className="">
      <input type="checkbox" id="payment-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="payment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{product_name}</h3>
          <p className="py-4">
            Please pay, you'll receive the order within 7 days
          </p>
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Write your name"
              className="input input-bordered w-full border-black rounded-none mb-2"
            />
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full border-black rounded-none mb-2"
            />
          </div>
          <CardElement
            className="border border-black px-2 py-4"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-black btn-wide my-4 text-white"
              disabled={!stripe || !clientSecret || processing}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentModal;

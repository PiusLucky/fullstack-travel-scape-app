"use client";

//@ts-ignore
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits } from "@/lib/actions/transaction";
import MainButton from "./MainButton";

const Checkout = ({
  plan,
  amount,
  credits,
  userId,
}: {
  plan: string;
  amount: number;
  credits: number;
  userId: string;
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Your order has been cancelled successfully",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async () => {
    try {
      setLoading(true);
      const transaction = {
        plan,
        amount,
        credits,
        userId,
      };
      setTimeout(async () => {
        await checkoutCredits(transaction);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <MainButton
          text="Proceed to checkout"
          classes="bg-[#48535B] text-white font-bold hover:bg-[#48535B]"
          isSubmitable
          isLoading={loading}
        />
      </section>
    </form>
  );
};

export default Checkout;

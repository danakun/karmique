"use client";
import { FormEvent, useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    // Add your newsletter subscription logic here
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Subscribing:", email);
      setEmail("");
      // You could show a success message here
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      <div>
        <h3 className="h4 mb-4">
          Join our club and get 10% off your first purchase
        </h3>
      </div>
      <form onSubmit={handleSubscribe} className="space-y-4">
        <div className="flex rounded border border-black">
          <input
            type="email"
            placeholder="Your mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input flex-1 rounded-none border-none focus:ring-0"
            required
            disabled={isSubscribing}
          />
        </div>
        <button
          type="submit"
          disabled={isSubscribing || !email}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
        </button>
      </form>
    </>
  );
}

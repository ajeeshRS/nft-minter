"use client";
import Loader from "@/components/Loader";
import MintNFT from "@/components/MintNFT";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { verifyEmail } from "./actions/actions";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const handleEmailVerification = async () => {
    setLoading(true);
    const response = await verifyEmail(email);
    if (response) {
      setVerified(true);
      toast.success("Email verified successfully");
    } else {
      toast.error("You are not a 100xDev.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-10">
      <h1 className="font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-500 to-white my-3">
        For 100xDevs, By 100xDevs: Your NFT Awaits
      </h1>

      {!verified ? (
        <div className="w-full h-fit flex items-center justify-center py-5">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-2/6 p-2 rounded-lg border border-slate-700 outline-none bg-black placeholder:text-gray-500 text-white"
            placeholder="Enter your email associated with 100xDevs"
          />
          <button
            onClick={handleEmailVerification}
            className="bg-white px-3 py-2 rounded mx-1 text-black font-medium hover:bg-slate-200"
          >
            {loading ? <Loader /> : "Verify"}
          </button>
        </div>
      ) : (
        <div className="w-full h-fit flex items-center justify-center py-5">
          <MintNFT />
        </div>
      )}
    </div>
  );
}

"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "./Loader";
import { mintNFT } from "@/app/actions/actions";

export default function MintNFT() {
  const [minting, setMinting] = useState<boolean>(false);

  const wallet = useWallet();

  const handleNFTMinting = async () => {
    try {
      setMinting(true);
      if (!wallet.publicKey) {
        toast.error("Please connect your wallet to continue");
        return;
      }

      const publicKeyString = wallet.publicKey.toBase58();

      const response = await mintNFT(publicKeyString);

      if (response.error == "AccountNotFoundError") {
        console.warn("Some error occured.But NFT minted!");
      }
      if (response.success) {
        toast.success("NFT minted to your wallet.");
      } else {
        toast.error(response.error);
      }
    } catch (_err) {
      toast.error("Error Minting NFT");
    } finally {
      setMinting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleNFTMinting}
        className="bg-white px-3 py-2 rounded mx-1 text-black font-medium hover:bg-slate-200"
      >
        {minting ? (
          <span className="flex items-center">
            Minting <Loader mx={"mx-2"} />
          </span>
        ) : (
          "Mint your 100xDevs NFT"
        )}
      </button>
    </>
  );
}

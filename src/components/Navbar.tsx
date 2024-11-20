"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export default function Navbar() {
  const wallet = useWallet();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <nav className="w-full h-fit bg-transparent flex items-center justify-between text-white md:px-10 px-5 py-6">
      <h2 className="text-xl font-bold">100xDevs</h2>
      <WalletMultiButtonDynamic
        style={{
          background: "white",
          border: "2px solid #cecece",
          borderRadius: "15px",
          color: "#020202",
          fontSize: "13px",
        }}
      >
        {`${
          isClient
            ? wallet.publicKey
              ? "Connected"
              : "Connect wallet"
            : "Loading..."
        }`}
      </WalletMultiButtonDynamic>
    </nav>
  );
}

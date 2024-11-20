"use server";
import {
  keypairIdentity,
  Metaplex,
  MetaplexError,
} from "@metaplex-foundation/js";
import { Keypair, PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import bs58 from "bs58";

export const mintNFT = async (walletPubkeyString: string) => {
  try {
    const walletPublicKey = JSON.parse(walletPubkeyString);

    if (!walletPublicKey) {
      throw new Error("Missing required field: walletPublicKey ");
    }
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const metadataUrl = process.env.METADATA_URL as string;
    const adminKeypair = Keypair.fromSecretKey(
      bs58.decode(process.env.ADMIN_PRIVATE_KEY as string)
    );

    const metaplex = Metaplex.make(connection).use(
      keypairIdentity(adminKeypair)
    );

    const mintKeypair = Keypair.generate();
    const userPublicKey = new PublicKey(walletPublicKey);

    const hasNFT = async () => {
      const nfts = await metaplex
        .nfts()
        .findAllByOwner({ owner: new PublicKey(walletPublicKey) });

      return nfts.some((nft) => nft.uri === metadataUrl);
    };

    const alreadyHaveNFT = await hasNFT();

    if (alreadyHaveNFT) {
      return {
        success: false,
        error: "You have already claimed your 100xDevs NFT",
      };
    }

    const { nft } = await metaplex.nfts().create({
      uri: metadataUrl,
      name: "100xDevs NFT",
      sellerFeeBasisPoints: 500,
      tokenOwner: userPublicKey,
      useNewMint: mintKeypair,
    });

    return { success: true, message: "Nft minted success" };
  } catch (error) {
    console.log(error);
    const err = error as MetaplexError;
    return { success: false, error: err.name };
  }
};

export const verifyEmail = async (email: string) => {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const isMember = email === "100xdev@gmail.com";
        if (isMember) {
          resolve(true);
        } else {
          reject(false);
        }
      }, 1000);
    });

    return true;
  } catch (err) {
    return false;
  }
};



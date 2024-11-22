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
    const walletPublicKey = walletPubkeyString;

    if (!walletPublicKey) {
      return { success: false, error: "Internal server error" };
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
        .findAllByOwner({ owner: userPublicKey });

      return nfts.some((nft) => nft.uri === metadataUrl);
    };

    const alreadyHaveNFT = await hasNFT();

    if (alreadyHaveNFT) {
      return {
        success: false,
        error: "You have already claimed your 100xDevs NFT",
      };
    }

    await metaplex.nfts().create({
      uri: metadataUrl,
      name: "100xDevs NFT",
      sellerFeeBasisPoints: 500,
      tokenOwner: userPublicKey,
      useNewMint: mintKeypair,
    });

    return { success: true, message: "Nft minted success" };
  } catch (error) {
    const err = error as MetaplexError;
    console.log(err);
    return { success: false, error: err.name };
  }
};

export const verifyEmail = async (email: string) => {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        const isMember = email === "testuser@gmail.com";
        if (isMember) {
          resolve(true);
        } else {
          reject(false);
        }
      }, 1000);
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

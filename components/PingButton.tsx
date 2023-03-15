import React from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { FC } from 'react'


const WalletMultiButtonDynamic = dynamic(
  async () => (await import("./AppBar")).AppBar,
  { ssr: false }
);


const Wallet: FC = () => {

const wallet = useWallet();
    const renderNotConnectedContainer = () => (
        <div>
          
                <WalletMultiButtonDynamic />
            </div>
       
    );

    return (
        <>
          
                    {renderNotConnectedContainer()}
       </>
    );
};

export default Wallet;
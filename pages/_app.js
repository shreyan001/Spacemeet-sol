import "../styles/globals.css";
import Link from "next/link";
import "../styles/custom.css";
import 'react-toastify/dist/ReactToastify.css';
import MobileWarning from '../components/functions/CheckRes.js'
import {createReactClient,studioProvider,LivepeerConfig} from '@livepeer/react';
import { useState,useEffect } from "react";
import "../styles/Cards.css"
import "../styles/Screen.css"
import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
 SolflareWalletAdapter, TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import '@dialectlabs/react-ui/index.css';

import { 
  DialectUiManagementProvider, 
  DialectThemeProvider, 
  DialectNoBlockchainSdk 
} from '@dialectlabs/react-ui';
import { FC } from 'react';

const SdkProvider = (props) => {
  // Starting with a default fallback to no-chain sdk
  return <DialectNoBlockchainSdk>{props.children}</DialectNoBlockchainSdk>;
}

// Dialect needs the connected wallet information from your wallet adapter, 
// wrapping in a separate component for composition
const DialectProviders= ({ children }) => {
  return (
    <SdkProvider>
      <DialectThemeProvider>
        <DialectUiManagementProvider>
          {children}
        </DialectUiManagementProvider>
      </DialectThemeProvider>
    </SdkProvider>
  );
}




function MyApp({ Component, pageProps }) {
  

  const [showPopup,setShowPopup] = useState(false);


    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can provide a custom RPC endpoint here
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new GlowWalletAdapter(),
    new SolflareWalletAdapter(), new TorusWalletAdapter()
      ],
      [network]
    );

  
const client = createReactClient ({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_PUBL_KEY
  }),
});




  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1024) {
      setShowPopup(true);
    }
  }, []);
  
  return (
    <div>
   
      <main className="container">
      <MobileWarning showPopup={showPopup} closePopup={()=>{setShowPopup(false)}}/>
      <LivepeerConfig client={client}>
      <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
        <DialectProviders>
  <Component {...pageProps} />
  </DialectProviders>
  </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
        </LivepeerConfig>
      </main>

    </div>
  );
}

export default MyApp;

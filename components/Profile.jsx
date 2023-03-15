import { useRouter } from "next/router";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";


export default function Profile() {

 const {publicKey} = useWallet();
 console.log(publicKey?.toBase58())
 function formatAddress(address) {
    if (address?.length > 8) {
      return address.substring(0, 5) + "..." + address.substring(address.length - 5);
    } else {
      return address;
    }
  }
  const addr = formatAddress(publicKey?.toBase58())

  return (
    <div className="flex flex-row justify-center items-center gap-4 px-1 w-fit h-fit "><div className="bg-[#232323] Profile  rounded px-2 py-2"><Image height={20} width={17} src="/Vector.svg" className="" /></div>
    <div className=" Profile w-[200px] h-[35px] flex flex-row px-1 bg-[#232323] rounded items-center justify-between">
    <Image height={20} width={17} src="/1212.svg" className="ml-0.5" />
   <div className="w-float h-2/3 bg-black4 rounded px-8 py-4 flex justify-center items-center"><h1 className="text-base">{addr}</h1>
   </div> </div> </div>
  );
}
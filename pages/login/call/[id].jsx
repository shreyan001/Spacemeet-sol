import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Profile from "../../../components/Profile";
import axios from "axios";
import Image from "next/image";
import { BsFacebook,BsTelegram,BsTwitter,BsDiscord,BsLinkedin } from 'react-icons/bs';
import { IconContext } from "react-icons";


export default function ProductPage() {
  const API = process.env.NEXT_PUBLIC_API_URI;
 const router = useRouter();
 const [name,setName] = useState([]);
 const [ObjId, setObjId]= useState(null);
 const [logo, setLogo]= useState([]);
 const { id } = router.query; 
useEffect(() => {
  const fetchData = async () => {
    try {
      const { id } = router.query;
      if (id) {
        const { data: callData } = await axios.post(`http://${API}/api/calls/get`, { callId: id });
        // if(callData.userDoc.Owner === useraddress){setIsOwner(true)}
        setName(callData.userDoc.callName);
        setObjId(callData.userDoc._id);
        setLogo(callData.userDoc.callLogo);
      }

    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching data');
    }
  };
  fetchData();
}, [router.query]);
  // Fetch data for the product with the specified ID using `id`

  return (
    <div className="w-full flex flex-col justify-center mx-auto">
       <div className="stream mx-auto"><div className="w-11/12 flex flex-row justify-start gap-5 items-center">
    <div className="btn1 overflow-hidden"><img className="" src={logo} width={100} height={100} alt="V"/></div>
    <div className="miniNav shadowCall"> <h1 className="font-semibold text-xl mx-3">{name}
         </h1> 
    </div></div><div className="w-1/4 flex flex-row justify-end gap-5 items-center">
   <Profile/></div></div>

   <div className="w-5/12 mt-5 mx-auto h-fit flex flex-col justify-center items-center p-5 bg-[#262626] rounded shadowCall">
       <h1 className="font-bold text-2xl my-2">Solana Grizzlython</h1>  <div className="w-10/12 py-5 h-fit"><Image src="/ticket.svg" height={230} width={500} alt={'imt.png'}/></div>
   <div className="flex w-2/3 flex-row justify-around items-center h-fit my-4">
    <p>Share Event -
    </p>
    <IconContext.Provider value={{ color: "#ff5555", className: "icons" }}>
   <BsDiscord/><BsFacebook/><BsLinkedin/><BsTwitter/><BsTelegram/>
 </IconContext.Provider>
</div>
<div className="w-10/12 flex flex-row mb-5 justify-center items-center">
  <div className="w-8/12 h-12 rounded bg-black4 text-xs flex flex-row justify-between items-center px-2">
  https://Block.xyz/event/12345678
  </div><button className="w-3/12 h-12 bg-black4 text-blue-600">Copy</button>
</div>
 <div className="w-9/12 flex flex-row justify-end "><button  className=" button1">Verify</button>
 <button  onClick={()=>{router.push(`/call/${id}`)}} className="button1">Enter</button>
  </div> </div>

 
   <div></div>
     
    </div>
  );
}

// <button onClick={()=>{router.push(`/call/${id}`)}} className="button1">Enter Meet</button>
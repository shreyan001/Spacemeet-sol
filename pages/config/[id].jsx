import { useRouter } from "next/router";
import Profile from "../../components/Profile";
import { useState } from "react";
import { useLivepeerProvider } from "@livepeer/react";
import { useCreateStream, createStream } from '@livepeer/react';
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import ShareModal from 'lit-share-modal';




const steps = ['Step 1', 'Step 2'];
export default function ProductPage() {
    const API = process.env.NEXT_PUBLIC_API_URI; 
  const [showShareModal, setShowShareModal] = useState(false);

  const onUnifiedAccessControlConditionsSelected = (shareModalOutput) => {
    console.log(shareModalOutput)
  }

      
const putStream = async ()=>{
    
    const toastId  = toast.loading("Loading...");
      const response = await axios.put(`https://${API}/api/meets/`, {id:id,streamKey:Key,streamId:Id});
    if (response.status === 200) {
      toast.update(toastId, { render: "Created New Room", type: "success", isLoading: false, autoClose: 5000})
     
     ;
    } else {
  
      toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
      
    };
  
  } 
 const router = useRouter();
  const { id } = router.query;
  const provider = useLivepeerProvider();
const [streamName, setStreamName] = useState();
const {
    mutate: createStream,
    data: stream,
} = useCreateStream({
    name: streamName,
});
 const [step, setStep] = useState(1);
  const [Key, setKey] = useState('');
  const [Id, setId] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleStepClick = (step) => {
    setStep(step);
  };

  const handleMeetButtonClick = () => {
   createStream?.()
    setKey(stream?.streamKey);
    setId(stream?.playbackId);
  };

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };

  const handleInputButtonClick = () => {
    router.push(`/call/${id}`)
  };


  return (
  <>
    <div className="flex items-center justify-center h-screen flex-row w-full">
    <ToastContainer
transition={Slide}
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <div className="bg-[#1c1c1c] w-10/12 rounded-lg text-white py-20 mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`${
                step === i + 1 ? 'bg-[#2A2A2A]' : 'bg-[#2a2a2a]'
              } py-2 px-4 mx-2 rounded-l-lg cursor-pointer`}
              onClick={() => handleStepClick(i + 1)}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="text-sm">
          {step === 1 && <p>Step 1</p>}
          {step === 2 && <p>Step 2</p>}
          {step === 3 && <p>Step 3</p>}
        </div>
      </div>
      <div className="flex space-x-8">
        <div className="flex-1">
          <div className="bg-[#2A2A2A] p-4 rounded-md">
          <div className="my-2"><h1 className="my-2 font-semibold">Config Stream</h1>
        <input className="appearance-none bg-inherit border border-gray-600 rounded-md py-2 px-4 block w-full leading-tight focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
         onChange={ (e) => setStreamName(e.target.value)}/>
        <button className="button1"
        onClick={()=> {handleMeetButtonClick()}}>Create Stream</button>
        {stream && <div className="renderKey">
            <p> <strong>stream Key:</strong>&nbsp; {Key}</p>
            <p> <strong>stream Name:</strong>&nbsp; {stream.name}</p>
            <p> <strong>stream Id:</strong>&nbsp;{Id}</p>
         {console.log(Key,Id)}
        </div>}
        </div>
</div>
</div>
<div className="flex-1">
<div className="bg-[#2A2A2A] p-4 rounded-md">
<div className="mb-4">
<h1 className="font-semibold my-2">Config Access Control</h1>
<button className="button1" onClick={() => setShowShareModal(true)}>
        Show Share Modal
      </button>
    
      {showShareModal && (
        <div className={'lit-share-modal'}>
          <ShareModal darkTheme={'true'}
            onClose={() => {
              setShowShareModal(false);
            }}
            onUnifiedAccessControlConditionsSelected={onUnifiedAccessControlConditionsSelected}
          />
        </div>
      )}
</div>

</div>
</div>


</div>
<div className="text-right">
<button
             className="button1"
             onClick={handleInputButtonClick}
           >
Next
</button>
</div>
</div>

</div>
 </> );
}

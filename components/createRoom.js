import { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";

function ModalForm({ isOpen, onClose,ObjId }) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [host, setHost] = useState("");
  const API = process.env.NEXT_PUBLIC_API_URI;

  
const roomAdd = async (name,topic, host)=>{
    
    const toastId  = toast.loading("Loading...");
      const response = await axios.post(`https://${API}/api/channels/`, {name:name,_id:ObjId,topic:topic,host:host});
    if (response.status === 200) {
      toast.update(toastId, { render: "Created New Room", type: "success", isLoading: false, autoClose: 5000})
     
     ;
    } else {
  
      toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
      
    };
  
  }

  function handleSubmit(event) {
    event.preventDefault();
    roomAdd( name, topic, host );
    onClose();
  }

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-black2 rounded-lg w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Create a new event</h2>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Close</title>
                <path
                  fillRule="evenodd"
                  d="M11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586l-4.293-4.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 1 0 1.414-1.414L11.414 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="appearance-none border rounded bg-inherit w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="topic">
                Topic
              </label>
              <input
                className="appearance-none border rounded bg-inherit w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="topic"
                type="text"
                placeholder="Enter topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="host">
                Host
              </label>
              <input
                className="appearance-none bg-inherit border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="host"
                type="text"
                placeholder="Enter host"
                value={host}
                onChange={(event) => setHost(event.target.value)}
/>
</div>
<div className="flex justify-end">
<button
             className="button1"
             type="submit"
           >
Create
</button>
</div>
</form>
</div>
</div>
</div>
);
}

export default ModalForm;

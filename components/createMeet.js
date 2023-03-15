import React, { useState } from 'react';
import axios from 'axios';
import { NFTStorage, File, Blob } from 'nft.storage'
import { useRouter } from 'next/router';

const CreateMeet = ({address, onClose, meetMod}) => {

  
  const API = process.env.NEXT_PUBLIC_API_URI;
  const router = useRouter();
  const [meetName, setMeetName] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoCid, setLogoCid] = useState(null);
  const [uploadError, setUploadError] = useState(null);


  const handleLogoUpload = async (event) => {
    setLoading(true);
    setUploadError(null);

    const file = event.target.files[0];

    const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_REACT_APP_NFT_STORAGE_TOKEN;
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
    try {
      const someData = new Blob([file])
       const cid = await client.storeBlob(someData)
      setLogoCid(cid);
      console.log(cid);
    } catch (error) {
      console.log(error);
      setUploadError('An error occurred while uploading the logo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!logoCid) {
      setUploadError('Please upload a logo before submitting the form.');
      return;
    }
     
   
    const data = {
      name: meetName,
      logo: `https://nftstorage.link/ipfs/${logoCid}`,
      Owner: address,
      
    };

    try {console.log(`https://${API}/api/calls/`);
      await axios.post(`https://${API}/api/calls/`, data).then(response => {
        const id = `callId`
        console.log(id);
        router.push(`/config/${response.data[id]}`)
      });
    } catch (error) {
      console.log(error);
    }

    setMeetName('');
   
  };

  const handleOptInChange = (event) => {
    setOptIn(event.target.value);
  };
  if(meetMod===false){return null};

  return (
    <div className="flex justify-center items-center h-screen popup">
      <div className="bg-black2 rounded-lg w-1/2 p-6 shadow-lg">
        <div className='w-11/12 h-fit mx-auto flex flex-row justify-between items-center'>
          <h2 className="text-center text-2xl">Create New Meet</h2>
          <div onClick={onClose} className='cursor-pointer w-fit px-1 bg-black rounded-sm h-fit'>
            <span className='text-lg font-bold'>X</span>
          </div>
        </div>
        
        <h3 className='my-5 ml-4 text-lg font-semibold'>Owner:&nbsp;{address}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="meetName">
              Meet Name:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-white bg-inherit leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="meetName"
              value={meetName}
              onChange={(event) => setMeetName(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="meetLogo">
              Meet Logo:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              id="meetLogo"
              onChange={handleLogoUpload}
              required
            />
            {loading && <p className="text-gray-700 text-sm mt-2">Uploading logo...</p>}
            {logoCid && <p className="text-green-500 text-sm mt-2">Logo uploaded successfully!</p>}
            {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
          </div>
         
      <button
        type="submit"
        className="button1"
      >
        Create Meet
      </button>
    </form>
  </div>
</div>
);
};

export default CreateMeet;

import { useState,useEffect} from 'react';
import axios from 'axios';
export default function Table({onOpen,tableName,OId}){
   const API = process.env.NEXT_PUBLIC_API_URI;
    const [isdata, setData] = useState([]); 
    
    let x = 4 - isdata.length;
 
    const synx2 = async(name) => {
      const {data} = await axios.get(`https://${API}/api/tables/${name}/?_id=${OId}`) 
      console.log(data, name)
      let data2 = data;
     if (data2) {
       
    const {data} = await axios.post(`https://${API}/api/users`, {addr:data2,_id:OId} )
    console.log(data,name);
    setData(data);
    }};

    useEffect(() => {
      synx2(tableName); 
  }, []);

 useEffect(() => {
    const intervalId = setInterval(() => {
    synx2(tableName); 

    }, 10000);

    return () => clearInterval(intervalId);
  }, [isdata]);

const items = new Array(x).fill(null);


    return (
               
        <div className="shadowCall flex flex-wrap items-center justify-center gap-4 w-5/12 h-32 bg-[#2a2a2a] px-4 py-2 rounded-sm">{console.log(isdata,tableName)}
          <div className="arrange2">  {isdata.map((i)=>{return <div className="profles2">
               <div className="image-clip"><img src={ i.image} alt={i.name}/></div> 
                <div className="nameit">{i.name}</div>
            </div>})}
{items.map((_, idx) => <div key={idx} onClick={()=>{onOpen(tableName),synx2(tableName)}} className="joindef cursor-pointer"><div className="joindef1"><h3>+</h3><h4>Join</h4></div></div>)}</div>
           </div>
    )
                    
 
} 
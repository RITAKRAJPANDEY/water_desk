import { getWqiLocationData } from "../services/auth.services";
import { RenderCard } from "./renderCard";

export default async function Cards({location}){
    const response = await getWqiLocationData(location);
    const data = response.data || [];
    return <div className="w-full max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 ">WQI Data For {location}</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length>0 ?(
                data.map((packet)=>(
                    <RenderCard key={packet.id} data={packet}/>
                ))
            ):(
          <p className="text-gray-600 text-lg col-span-full py-8">No stations found in this area.</p>
        )}
         </div>
    </div>
}
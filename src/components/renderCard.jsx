import Link from "next/link"

export const RenderCard = async ({ data }) => {
  return (

    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{data.location}</h3>
      {data.station_code && <p className="text-sm text-gray-600 mb-4">Station: {data.station_code}</p>}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Water Quality Index</p>
        <div className="flex  ">
          <p className="text-3xl font-bold text-blue-600">{data.wqi}</p>

          <Link className="bg-black p-1 mx-auto my-auto text-white rounded-md   cursor:pointer " href={`/details/${data.station_code}`}>Details</Link>
        </div>
        <p className="text-sm mt-2 font-semibold text-gray-700">Category: <span className="text-blue-500">{data.category}</span></p>
      </div>
      {data.alarming_parameters && data.alarming_parameters.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 rounded">
          <p className="text-xs font-bold text-red-600">Alarming: {data.alarming_parameters.join(", ")}</p>
        </div>
      )}
    </div>

  )
}
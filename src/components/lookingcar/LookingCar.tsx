import car from "../../../public/images (16).jpeg";
import Image from "next/image";

const LookingCar = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />
      <Image
        src={car}
        alt="Car background"
        fill
        className="object-cover z-0"
      />
      <div className="relative z-20 max-w-6xl mx-auto px-4 pt-20">
        <h1 className="text-white text-5xl font-bold uppercase mb-4">
          LOOKING FOR A CAR?
        </h1>
        <p className="text-white text-lg mb-8">
          Look for your car in our magazine and ask us for a quote on the vehicle of your choice.
        </p>
        
        <div className="bg-white/90 p-8 rounded-lg backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-gray-800 block mb-2">SORT BY PRICE</label>
              <select className="w-full p-2 border rounded">
                <option>Sort...</option>
              </select>
            </div>
            
            <div>
              <label className="font-bold text-gray-800 block mb-2">ENERGY TYPE</label>
              <select className="w-full p-2 border rounded">
                <option>Select</option>
              </select>
            </div>
            
            <div>
              <label className="font-bold text-gray-800 block mb-2">BRAND</label>
              <select className="w-full p-2 border rounded">
                <option>Select...</option>
              </select>
            </div>
            
            <div>
              <label className="font-bold text-gray-800 block mb-2">PRICE</label>
              <div className="text-gray-600">
                ₹1,299 — ₹16,899
              </div>
            </div>
          </div>
          
          <button className="mt-6 bg-teal-500 text-white px-8 py-2 rounded hover:bg-teal-600 transition-colors">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default LookingCar;
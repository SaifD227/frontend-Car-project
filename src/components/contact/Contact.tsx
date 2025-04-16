import { FaRegThumbsUp } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { TiTick } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import Image from "next/image";
import image from "../../../public/green-car-min.webp";

const Contact = () => {
  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center p-6">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex flex-col gap-4 items-end">
            <div>
              <FaRegThumbsUp className="text-teal-500 text-2xl" />
            </div>

            <div className="flex flex-col gap-4 text-right">
              <h1 className="text-xl font-bold">Best Offers</h1>
              <p className="text-gray-500 w-96">
                Strong of our 32 automotive partners, you will enjoy the widest choices
                of new vehicles on the Israeli market. Car Adviser is offering a catalog
                with more than 950 new models available along with remarkable discounts.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-end space-y-3">
            <div>
              <FaCircleDollarToSlot className="text-teal-500 text-2xl" />
            </div>

            <div className="flex flex-col gap-4 text-right">
              <h1 className="text-xl font-bold">Financing</h1>
              <p className="text-gray-500 w-96">
                To fit your needs, we are offering two main different types of financing: Classic Financing and Financing with an option to buy. All with the possibility of trading in or selling your vehicle at the time of your choice. With Car Adviser, you have total freedom.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-end space-y-3">
            <div>
              <TfiWrite className="text-teal-500 text-2xl" />
            </div>

            <div className="flex flex-col gap-4 text-right">
              <h1 className="text-xl font-bold">Insurance</h1>
              <p className="text-gray-500 w-96">
                Guarantying the safety of our clientele is one of our main concerns, and this is the reason why you will also find in all our -included service the Insurance. You will be able to benefit from the best insurance services in the country (Mekiff & Hova). Provided as always with an excellent quality/price / Service ratio!
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-end space-y-3">
            <div>
              <TiTick className="text-teal-500 text-2xl" />
            </div>

            <div className="flex flex-col gap-4 text-right">
              <h1 className="text-xl font-bold">Getting Started</h1>
              <p className="text-gray-500 w-96">
                Once the previous steps are completed, our team will take care of preparing the vehicle for the long-awaited event: The delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Center Image */}
        <div className="w-full md:w-1/3 px-10 flex justify-center my-6 md:my-0">
          <Image
            src={image}
            alt="car"
            width={300}
            height={300}
            className=""
          />
        </div>

     


        {/* Right Side Content */}
        <div className="w-full md:w-1/2 space-y-6 ">
          <div className="flex flex-col gap-6 items-start ">
            <div>
              <FaRegUser className="text-teal-500 text-2xl" />
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="text-xl font-bold">Administrative</h1>
              <p className="text-gray-500 w-96">
                Also available in our all-included service, the administrative part for Olims 'Hadachims (new immigrants). Let us take care of all the documents required and the process to obtain the precious Ole hadach discount
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-start space-x-3">
            <div>
              <FaHandPointRight className="text-teal-500 text-2xl" />
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-xl font-bold">Delivery</h1>
              <p className="text-gray-500 w-96">
                The big day has arrived! Be assured our team wouldn't miss this for the world. When the vehicle is delivered, one of our Advisers will be present to offer you the most intense delivery experience. Indeed, we will explain the proper functioning of the vehicle, from the tire to the bumper
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-start space-x-3">
            <div>
              <FaCarSide className="text-teal-500 text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Trade-in</h1>
              <p className="text-gray-500 w-96">
                We take care of the trade-in of your old vehicle for the purchase of a new one. You don't have to worry about it, as said in our motto, it is an all-inclusive service, just sit back and relax.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-start space-x-3">
            <div>
              <FaExchangeAlt className="text-teal-500 text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Exchange / Purchasing</h1>
              <p className="text-gray-500 w-96">
                If you want to change your vehicle during or at the end of the financing period, is -it possible with us at Car Adviser, you will always have the choice! We are at your disposal to exchange your vehicle for a new one.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Us Button */}
      <div className="w-full flex mb-10  justify-center">
        <button className="bg-teal-600  text-white px-10 py-3 rounded hover:bg-teal-700 transition-colors">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Contact;
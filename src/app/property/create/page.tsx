import Button from "@/components/Atoms/Button";

export default function CreateProperty() {
  return (
    <div className={``}>
      <div className={`font-inter font-semibold h2 mb-6 text-black`}>
        Create Property
      </div>
      <div className={` text-black w-full font-lato flex flex-col gap-4`}>
        <div className={`bg-white divide-y px-6 `}>
          <div className={`py-5`}>Hello</div>
          <div className={`flex flex-col py-5 gap-6`}>
            <div className={`text-sm`}>
              <div className="font-montserrat body1 mb-3 body2">
                Property Title
              </div>
              <input
                className={`bg-[#fcfcfc]  border border-gray-300 focus:border-b focus:outline-none focus:border-primary  px-5 py-3 rounded-lg w-full `}
                placeholder={`Property Title`}
              />
            </div>

            <div className={`text-sm`}>
              <div className="font-montserrat body1 mb-3 body2">
                Property Type
              </div>
              <select
                className={`bg-[#fcfcfc]  border border-gray-300 focus:border-b focus:outline-none focus:border-primary  px-5 py-3 rounded-lg w-full `}
              >
                <option>Hello</option>
              </select>
            </div>
          </div>
        </div>
        <div className={`bg-white p-6 rounded-lg`}>
          <div className="font-montserrat body1 mb-6">Property Title</div>
          <input
            className={`bg-[#fcfcfc] border-b border-gray-300 focus:border-b focus:outline-none focus:border-primary  p-1 w-full `}
            placeholder={`Property Title`}
          />
        </div>
        <div className={`bg-white p-6 rounded-lg`}>
          <div className="font-montserrat body1 mb-6">Property Type</div>
          <select
            className={`bg-[#fcfcfc] rounded-lg border border-black border-opacity-50  focus:border-primary  p-4 w-full `}
          >
            <option>Hello</option>
          </select>
        </div>
        <div className={`bg-white p-6 rounded-lg`}>
          <div className="font-montserrat body1 mb-6">Property Title</div>
          <input
            className={`bg-[#fcfcfc] border-b border-gray-300 focus:border-b focus:outline-none focus:border-primary  px-1 w-full `}
            placeholder={`Property Title`}
          />
        </div>
        <div className={`w-full h-[2px] bg-gray-300`} />
        <div>
          <div className="font-montserrat body1">Property Title</div>
          <input
            className={`bg-[#ffffff] rounded-lg focus:outline-primary px-4 py-3 w-full mt-2`}
            placeholder={`Property Title`}
          />
        </div>
        <div>
          <div className="font-montserrat body1">Property Title</div>
          <input
            className={`bg-[#f0f0f0] rounded-lg focus:outline-primary px-4 py-3 w-full mt-2`}
            placeholder={`Property Title`}
          />
        </div>
      </div>
      <Button className={` mb-20 `}>Create Property</Button>
    </div>
  );
}

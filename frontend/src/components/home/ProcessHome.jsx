const ProcessHome = () => {
  return (
    <div className="">
      <h2 className="text-4xl font-medium text-[#0A3ff] mb-10 text-center">
        Create And Sell{" "}
        <span className="text-color-primary">🌾 Sell Your Crops in Four Simple Steps
        </span>
      </h2>
      <div className="grid grid-cols-1 m-auto gap-5   w-full  md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
          <h2 className="text-5xl font-bold text-stroke">01</h2>
          <h3 className="text-2xl font-bold"> Set Up Your Farmer Account
          </h3>
          <p className="text-body-text-color">
          Register for free and gain access to a platform built to connect you directly with buyers across the country.


          </p>
        </div>
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
          <h2 className="text-5xl font-bold text-stroke">02</h2>
          <h3 className="text-2xl font-bold">Create Your Crop Listing
          </h3>
          <p className="text-body-text-color">
          Add detailed crop information, including type, quality, quantity, and images to attract the right bidders.


          </p>
        </div>
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
          <h2 className="text-5xl font-bold text-stroke">03</h2>
          <h3 className="text-2xl font-bold">Set Your Starting Bid Price</h3>
          <p className="text-body-text-color">
          Decide your starting price and optional reserve price to ensure a fair and competitive auction.


          </p>
        </div>
        <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
          <h2 className="text-5xl font-bold text-stroke">04</h2>
          <h3 className="text-2xl font-bold">Go Live & Start Earning</h3>
          <p className="text-body-text-color">
          Publish your listing and let buyers bid in real-time. Watch your produce turn into profit—quickly and transparently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessHome;

import { Link } from "react-router-dom";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import aboutimg from "../assets/aboutus.png";
import dev1 from "../assets/dev1.jpg";
import dev2 from "../assets/dev2.jpg";
import dev3 from "../assets/dev3.jpg";
import dev4 from "../assets/dev4.jpg";
import CreateEarnHome from "../components/home/CreateEarnHome";

const AboutUs = () => {
  const devs = [
    {
      id: 1,
      src: dev1,
      name: "Harish Singh",
      skill: "Backend Developer",
    },
    {
      id: 2,
      src: dev2,
      name: "Kushal Sharma",
      skill: "BackEnd Developer",
    },
    {
      id: 3,
      src: dev3,
      name: "Abha Sharma",
      skill: "UI/UX Developer",
      
    },{
      id: 4,
      src: dev4,
      name: "Gaurav Sharma",
      skill: "Frontend Developer",
      
    },
  ];

  return (
    <>
      <div className="text-white flex items-center justify-center flex-col h-[280px] bg-hero-img bg-center-center bg-cover-full bg-no-repeat relative before:content-[''] before:absolute before:inset-0 before:bg-[#1B3D1B] before:bg-opacity-50">
        <h1 id="home" className="text-center font-bold text-3xl relative z-10">
          About Us
        </h1>
        <div className="flex gap-2 font-medium pt-2 relative z-10">
          <Link
            to={"/"}
            className="no-underline hover:text-[#4CAF50] transition-all"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-[#4CAF50]">About Us</span>
        </div>
      </div>
      {/* About US PARENT */}
      <div className="text-white flex flex-col gap-20 pt-20 px-6 lg:px-11 ">
        {/* ABOUT US Section */}
        <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
          <img className="min-w-48 " src={aboutimg} alt="aboutusimage" />
          <div className="flex flex-col gap-4 lg:min-w-[50%] lg:w-1/2">
            <div className="mb-4">
              <span className="text-lg tracking-[5px] uppercase text-theme-color font-semibold">
              🌾 About BidMyCrop
              </span>
              <h2 className="mt-2 text-4xl font-medium">
              Digital Farming Meets Real-Time Bidding.


              </h2>
            </div>
            <div className="text-body-text-color">
              <p className="mb-2">
              BidMyCrop is an innovative online auction platform designed to modernize crop trading by connecting farmers and buyers through transparent, competitive, and real-time bidding. Whether you're a farmer looking to get fair market value or a buyer seeking quality produce, BidMyCrop is your go-to digital marketplace.
              </p>
              <p className="mb-2">
              Through our intuitive Auction Listing Module, farmers can easily create detailed crop listings—complete with product descriptions, quantity, and quality details. Our dynamic Bid Engine allows buyers to place real-time bids, fostering healthy competition and better pricing for all.
              </p>
              <p>
              Every bid is time-stamped and securely recorded, ensuring full transparency and trust in every transaction. With cross-browser compatibility, BidMyCrop offers a seamless experience across devices—be it smartphone, tablet, or desktop.
              At BidMyCrop, we're sowing the seeds of digital transformation in agriculture—empowering farmers, helping buyers, and building a future where technology supports fair and efficient crop trading.
              </p>
            </div>
          </div>
        </div>
        {/* OUR TEAM SECTION*/}
        <div className="m-auto">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-lg tracking-[5px] uppercase text-theme-color font-semibold">
              Our Team
            </span>
            <h2 className="mt-2 text-4xl font-medium">Meet With Our Experts</h2>
          </div>
          <div className="grid md:grid-cols-3 items-center justify-center gap-5 max-w-[1500px]">
            {/* dev component */}
            {devs.map(({ id, src, name, skill }) => (
              <div
                key={id}
                className="border border-border-info-color bg-theme-bg p-5 flex flex-col items-center gap-3 text-center rounded-[20px]"
              >
                <div className="rounded-[20px] overflow-hidden">
                  <img
                    className="rounded-[20px] hover:scale-105 transition-all duration-300"
                    src={src}
                    alt="creatorimg"
                  />
                </div>
                <div>
                  <span className="text-xl font-medium">{name}</span>
                  <br />
                  <span className="text-body-text-color">{skill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1500px] m-auto">
          <div className="mb-10 text-center">
            <span className="text-lg tracking-[5px] uppercase text-theme-color font-semibold">
              Process
            </span>
            <h2 className="mt-2 text-4xl font-medium">
              Create And Sell{" "}
              <span className="text-color-primary">Your Products</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 m-auto gap-5   w-full  md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
              <h2 className="text-5xl font-bold text-stroke">01</h2>
              <h3 className="text-2xl font-bold">Setup your Account</h3>
              <p className="text-body-text-color">
                Register for a free account and unlock the power to sell
                anything, anytime.
              </p>
            </div>
            <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
              <h2 className="text-5xl font-bold text-stroke">02</h2>
              <h3 className="text-2xl font-bold">Create Your Auction</h3>
              <p className="text-body-text-color">
                Create a compelling listing that showcases your item and
                attracts potential buyers.
              </p>
            </div>
            <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
              <h2 className="text-5xl font-bold text-stroke">03</h2>
              <h3 className="text-2xl font-bold">Add Starting Price for Bid</h3>
              <p className="text-body-text-color">
                Determine your starting bid and consider a reserve price for
                added control.
              </p>
            </div>
            <div className="flex flex-col text-white gap-4 justify-start p-8 rounded-2xl bg-theme-bg ">
              <h2 className="text-5xl font-bold text-stroke">04</h2>
              <h3 className="text-2xl font-bold">List Product for Sale</h3>
              <p className="text-body-text-color">
                Publish your Product and watch the bids come in, turning your
                unused items into revenue.
              </p>
            </div>
          </div>
        </div>
        <CreateEarnHome />
      </div>
    </>
  );
};

export default AboutUs;

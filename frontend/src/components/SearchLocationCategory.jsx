import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reset } from "../store/auth/authSlice";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCategories } from "../store/category/categorySlice";
import { getAllCities } from "../store/city/citySlice";
import axios from "axios";


const SearchLocationCategory = () => {
  const [filter, setFilter] = useState({
    location: "",
    category: "",
    itemName: "",
  });

  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, []);

  // //console.log(categories, "categories")
  // //console.log(cities, "cities")

  const SearchByFilter = () => {
    //console.log(filter, "filter ssss ");

    dispatch(getAllAuctions(filter));
  };

  const [city, setCity] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
      
          try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=318f69a969db4f7599b7fbb5043e444e`);
      
            //console.log(response, " response from location,  ,,,,,,,,,,");
      
            if (response.data && response.data.results && response.data.results[0]) {
              let district = response.data.results[0].components.district;
              district = district?.slice(0, -8)?.trim();
              setCity(district);
            }
          } catch (error) {
            //console.error('Error getting city name:', error);
          }
        },
        (error) => {
          //console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true
        }
      );
    }
  }, []);
  
  
  //console.log(city);

  return (
    <div className="flex justify-center items-center my-5 min-h-[100px] w-full px-4">
      <div className="flex-col sm:flex-row sm:items-center bg-[#E3F2FD] rounded-xl p-4 w-full max-w-7xl mx-auto gap-4">
        <select
          required
          id="location"
          className="bg-white px-4 text-[#1565C0] w-full sm:w-[25%] block sm:inline py-3 rounded-xl outline-none border border-[#2196F3] focus:border-[#1565C0] cursor-pointer transition-all hover:shadow-md"
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        >
          <option value="">Select Location</option>
          {city && <option value={city}>Current Location</option>}
          {cities.data &&
            cities.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>

        <select
          required
          id="category"
          className="bg-white px-4 text-[#1565C0] w-full sm:w-[25%] mt-2 sm:mt-0 block sm:inline py-3 rounded-xl outline-none border border-[#2196F3] focus:border-[#1565C0] cursor-pointer transition-all hover:shadow-md"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.data &&
            categories.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Search Name"
          className="bg-white py-3 px-4 text-[#1565C0] w-full sm:w-[30%] mt-2 sm:mt-0 block sm:inline rounded-xl border border-[#2196F3] focus:border-[#1565C0] outline-none placeholder:text-[#90CAF9] transition-all hover:shadow-md"
          value={filter.itemName}
          onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
        />
        <button
          className="bg-[#2196F3] w-full sm:w-[20%] mt-2 sm:mt-0 hover:bg-[#1565C0] text-white font-medium rounded-xl px-6 py-3 text-center no-underline border-none transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
          onClick={() => SearchByFilter()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchLocationCategory;

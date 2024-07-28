import RestaurantCard from "./RestaurantCard";
// import resList from "../../utils/constants";
import { useEffect, useState } from "react";
// import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRastaurants, setListOfRastaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = data.json();
    let data2 = data.json()
    console.log("apiData", json);
    setListOfRastaurants(
      // optional chaining
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // setListOfRastaurants(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
  };

  // if (listOfRastaurants.length === 0) {
  //   return <Shimmer />;
  // }

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filterList = listOfRastaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setListOfRastaurants(filterList);
          }}
        >
          Top Rated Rastaurants
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            setListOfRastaurants(fetchData());
          }}
        >
          Reset
        </button>
      </div>
      <div className="res-container">
        {listOfRastaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;

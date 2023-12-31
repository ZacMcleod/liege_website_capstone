import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";



const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddClothingItems Page to add a clothing_item for a logged in user's garage
  const [ user, token ] = useAuth();
  const [clothingItems, setClothingItems] = useState([]);
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("all");
  const [filterSize, setFilterSize] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");

  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/clothing_items", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setClothingItems(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchClothingItems();
  }, [token]);

  const filteredClothingItems = clothingItems.filter((c) => {
    const typeMatches = filterType === "all" || filterType === c.type;
    const sizeMatches = filterSize === "all" || filterSize === c.size;
    const colorMatches = filterColor === "all" || filterColor === c.color;
    const yearMatches = filterYear === "all" || parseInt(filterYear) === c.year;
    const priceMatches = filterPrice === "all" || parseInt(filterPrice) >= c.price;
    
    return typeMatches && sizeMatches && colorMatches && yearMatches && priceMatches;
  });

  const ifAdmin = () => {
    if (user && user.is_admin){
      return (
        <button onClick={() => navigate('/admin')} className='container'>Admin Page</button>
      );
    }
    else{
      return (
        <button onClick={() => navigate('/admin')} className='container'>Admin Page</button>
      )
    }
  };

  return (
    <div className="container-v2">
      {console.log(user)}
      <div className="admin">
        {ifAdmin()}
      </div>
      <h4 className="admin">FILTER</h4>
      <div className="filter-container">
        <div className="filter-section">
          <label>Types: </label>
          <button onClick={() => setFilterType("all")}>All Types</button>
          <button onClick={() => setFilterType("hat")}>Hats</button>
          <button onClick={() => setFilterType("t-shirt")}>T-Shirts</button>
          <button onClick={() => setFilterType("sweatshirt")}>Sweatshirts</button>
          <button onClick={() => setFilterType("sweatpants")}>Sweatpants</button>
          <button onClick={() => setFilterType("shoes")}>Shoes</button>
        </div>
        <div className="filter-section">
          <label>Sizes</label>
          <button onClick={() => setFilterSize("all")}>All Sizes</button>
          <button onClick={() => setFilterSize("extra small")}>Extra Small</button>
          <button onClick={() => setFilterSize("small")}>Small</button>
          <button onClick={() => setFilterSize("medium")}>Medium</button>
          <button onClick={() => setFilterSize("large")}>Large</button>
          <button onClick={() => setFilterSize("extra large")}>Extra Large</button>
        </div>
        <div className="filter-section">
          <label>Colors: </label>
          <button onClick={() => setFilterColor("all")}>All Colors</button>
          <button onClick={() => setFilterColor("white")}>White</button>
          <button onClick={() => setFilterColor("black")}>black</button>
          <button onClick={() => setFilterColor("red")}>Red</button>
          <button onClick={() => setFilterColor("orange")}>Orange</button>
          <button onClick={() => setFilterColor("yellow")}>Yellow</button>
          <button onClick={() => setFilterColor("green")}>Green</button>
          <button onClick={() => setFilterColor("blue")}>Blue</button>
          <button onClick={() => setFilterColor("purple")}>Purple</button>
          <button onClick={() => setFilterColor("pink")}>Pink</button>
        </div>
        <div className="filter-section">
          <label>Release Years: </label>
          <button onClick={() => setFilterYear("all")}>All Years</button>
          <button onClick={() => setFilterYear("2020")}>2020</button>
          <button onClick={() => setFilterYear("2021")}>2021</button>
          <button onClick={() => setFilterYear("2022")}>2022</button>
          <button onClick={() => setFilterYear("2023")}>2023</button>
        </div>
        <div className="filter-section">
          <label>Price: </label>
          <button onClick={() => setFilterPrice("all")}>All Prices</button>
          <button onClick={() => setFilterPrice("80")}>$80 or less</button>
          <button onClick={() => setFilterPrice("50")}>$50 or less</button>
          <button onClick={() => setFilterPrice("30")}>$30 or less</button>
        </div>
      </div>
      {filteredClothingItems.map((filteredClothingItem) => (
          <div key={filteredClothingItem.id} className="clothingItem">
            <div>
              <img className="imgSizing" src={filteredClothingItem.picture} alt=""/>
            </div>
            <div className="clothingItem-description">
              {filteredClothingItem.description}
            </div>
            <div>
              {filteredClothingItem.type} ${filteredClothingItem.price}
            </div>
            <div>
              <button onClick={() => navigate(`/clothing_item/${filteredClothingItem.id}`)}>View Item Details</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
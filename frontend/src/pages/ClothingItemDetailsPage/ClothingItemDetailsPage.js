import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./ClothingItemDetailsPage.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from 'react';
import useAuth from '../../hooks/useAuth';


const ClothingItemDetailsPage = () => {

    const navigate = useNavigate()

    //const { loginUser, user, authToken } = useContext(AuthContext);
    const [user, token] = useAuth();
    const { item_id } = useParams();
    const [clothingItem, setClothingItem] = useState();
    const [postIsLoading, setPostIsLoading] = useState(true);
    const [getIsLoading, setGetIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    
    const getClothingItemDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/clothing_item/${item_id}`);
            setClothingItem(response.data);
            setGetIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const postClothingItemToCart = async () => {
        if (user) {
            try {
                const payload = {
                    // user_id: user.id,
                    type: clothingItem.type,
                    price: clothingItem.price,
                    color: clothingItem.color,
                    year: clothingItem.year,
                    picture: clothingItem.picture,
                    description: clothingItem.description,
                    size: clothingItem.size,
                    clothing_item_id: clothingItem.id
                };
                console.log(payload);
                const response = await axios.post('http://127.0.0.1:5000/api/post_cart_item', payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    },
                });
                setCartItems([...cartItems, response.data]);
                setPostIsLoading(false);
            } catch (err) {
            console.error(err);
        }
        }
        else {
            navigate("/login");
        }
    }

    useEffect(() => {
        getClothingItemDetails();
    }, [item_id]);



    return (
        <div>
            {getIsLoading ? (
                <h4>L O A D I N G . . . . .</h4>
            ) : (
            <div>        
                <div className="clothingDetails-flex">
                    <div>
                        <img src={clothingItem.picture} className="imgSizing-details"/>
                    </div>
                    <div className="textFlex-container">
                        <h3 className="textFlex">Type: {clothingItem.type}</h3>
                        <h3 className="textFlex">Size: {clothingItem.size}</h3>
                        <h3 className="textFlex">Year: {clothingItem.year}</h3>
                        <h3 className="textFlex">Color: {clothingItem.color}</h3>
                    </div>
                    
                </div>
                <div className="textFlexDescription">{clothingItem.description}</div>
                <label className="textFlexDescription">Add to Cart: </label>
                <button onClick={postClothingItemToCart}>Add</button>
            </div>
            )}

            
            {postIsLoading ? (
                <h4 className="textFlexDescription">L O A D I N G . . . . .</h4>
            ) : (
                <div className="textFlexDescription">Added!</div>
            )}
            
            <div className="textFlexDescription">
                <button onClick={() => navigate(`/review/${item_id}`)}>Reviews</button>
            </div>
            <div className="textFlexDescription">
                <button onClick={() => navigate(`/question/${item_id}`)}>Questions?</button>
            </div>
            
        </div>
    )
}

export default ClothingItemDetailsPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import "./CartPage.css"
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

const CartPage = () => {

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, token] = useAuth();
    const { item_id } = useParams();

    const getCartItems = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/cart_items', {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(response.data);
            setIsLoading(false);
        }
        catch (err){
            console.error(err)
        }
    }

    const removeCartItem = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/delete_cart_item/${item_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
            } catch (err) {
            console.error(err);
        }
    }

    const displayCartItems = () => {
        return (
        cartItems.map((cartItem) => (
            <div key={cartItem.id} className="clothingItem">
                <img src={cartItem.picture} className="imgSizing-cart"></img>
                <p>{cartItem.description}</p>
                <p>{cartItem.type}</p>
                <h1>${cartItem.price} <button onClick={(() => removeCartItem())}></button></h1>
            </div>)
        ));
    };

    useEffect(() => {
        getCartItems();
        }, []);

    return (
        <div>
            {isLoading ? (
                    <div>L O A D I N G . . . . .</div>
            ) : (
                    <div>
                        {displayCartItems()}
                    </div>
                )
            }
        </div>
    )
    
}           
export default CartPage;
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
    const [totalCost, setTotalCost] = useState(0)
    const [sales, setSales] = useState(0);
    const [salesRevenue, setSalesRevenue] = useState(0);

    const getCartItems = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/cart_items', {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(response.data);
            console.log(cartItems)
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
        const userCartItems = cartItems.filter((cartItem) => cartItem.user_id === user.id);
        return (
        
            userCartItems.map((cartItem) => (
                <div className="container" key={cartItem.id}>
                    <div key={cartItem.id} className="clothingItem">
                        <img src={cartItem.picture} className="imgSizing-cart"></img>
                        <p>{cartItem.description}</p>
                        <p>{cartItem.type}</p>
                        <h1>${cartItem.price} <button onClick={(() => removeCartItem())}></button></h1>
                    </div>
                </div>
        )));
    };


    const buy = () => {
        const result = window.confirm("(insert Credit/Debit/Bank info here) ");
        if(result) {
            const currentTotalCost = cartItems.reduce((totalCost, cartItem) => totalCost + cartItem.price, 0);
            setSales((prevSales) => prevSales + cartItems.length);
            setSalesRevenue((prevRevenue) => prevRevenue + currentTotalCost);

            localStorage.setItem('sales', JSON.stringify(sales + cartItems.length));
            localStorage.setItem('salesRevenue', JSON.stringify(salesRevenue + currentTotalCost));
            return (
                <div>*Item bought*</div>
            )
        }
        else{
            return(
                <div>Transaction Canceled</div>
            )
        }

    }

    useEffect(() => {
        getCartItems();
        }, []);

    useEffect(() => {
        const newTotalCost = cartItems.reduce((totalCost, cartItem) => totalCost + cartItem.price, 0);
        setTotalCost(newTotalCost);
    }, [cartItems]);

    return (
        <div>
            {isLoading ? (
                    <div>L O A D I N G . . . . .</div>
            ) : (
                    <div>
                        <div className="container">
                            <div className="totalCost">
                                Total Cost: ${totalCost}
                            </div>
                            <button onClick={buy}>Buy All</button>
                        </div>
                        {displayCartItems()}
                    </div>
                )
            }
        </div>
    )
    
}           
export default CartPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import preventDefault from 'react';

const ReviewPage = () => {

    const {item_id} = useParams();
    
    
    const [reviews, setReviews] = useState([]);
    const [userReviewText, setUserReviewText] = useState("");
    const [userRating, setUserRating] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [user, token] = useAuth();

    const getReviews = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/reviews');
            console.log(response.data);
            setReviews(response.data);
            setIsLoading(false);
            localStorage.setItem('reviews', JSON.stringify(response.data));
        }   
        catch (err) {
            console.error(err);
        }
    }

    const postReview = async (e) => {
        e.preventDefault();
        const userReview = {
            "clothing_item_id": item_id,
            "review_text": userReviewText,
            "rating": userRating,
            "user_id": user.id
        }


        console.log(userReview);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/post_review', userReview,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
            getReviews()
            console.log(userReview);
            setIsLoading(false);
        }   
        catch (err) {
            console.error(err);
        }
    }

    const reviewFilter = (item_id) => {
        const filteredReviews = reviews.filter(review => review.clothing_item_id === Number(item_id))
        console.log("Filtered Reviews", filteredReviews);
        return filteredReviews;
    }

    // const submitReview = () => {
    //     setUserReview({
    //         "clothing_item_id": userReview.clothing_item_id,
    //         "review_text": userReview.review_text,
    //         "rating": userReview.review_rating,
    //         "user_id": user.id
    //     });
    //     return postReview();
    // }

    const ifUserCheck = (user) => {
        if (user) {
            return (
                <div className="container">
                    <label>Rating: </label>
                    <input onChange={(e) => setUserRating(e.target.value)} value={userRating} type="number" min="1" max="10"></input>
                    <label>Review: </label>
                    <input onChange={(e) => setUserReviewText(e.target.value)} value={userReviewText}></input>
                    <button onClick={(e) => postReview(e)}>Submit Review</button>
                </div>
            )
        }
        else {
            return (
                <div className="container">Login to submit a review</div>
            )
        }
        
    }


    const ifUserCheck2 = (user) => {
        if (user) {
            return (
                <div>
                    {user.username}:
                </div>
            )
        } 
        else {
            return (
                <div>
                
                </div>
            )
        }
    }

    useEffect(() => {
        getReviews();
        }, []);

    return (
        
        <div>
            {ifUserCheck(user)}
            {isLoading ? (
                <div>L O A D I N G . . . . .</div>
            ) : (
                <div className="clothingItem-container">
                    {reviewFilter(item_id).map(review => 
                        <div key={review.id} className="clothingItem">
                            {ifUserCheck2(user)}
                            <p>Rating: {review.rating}/10</p>
                            <p>Review: {review.review_text}</p>
                        </div>
                        )
                    }
                </div>
            )};
        </div>
    )
}

export default ReviewPage;
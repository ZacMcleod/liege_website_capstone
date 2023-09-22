import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

const AdminPage = () => {
    const [sales, setSales] = useState(0);
    const [salesRevenue, setSalesRevenue] = useState(0);
    const [questions, setQuestions] = useState([{}]);
    const [reviews, setReviews] = useState([{}]);

    const [ user, token ] = useAuth();
    

    const consoleLog= () => {
        console.log("User ", user)
        console.log("is Admin?: ", user?.is_admin);
    }

    useEffect(() => {
        const storedSales = JSON.parse(localStorage.getItem('sales')) || 0;
        const storedSalesRevenue = JSON.parse(localStorage.getItem('salesRevenue')) || 0;
        const storedQuestionsJSON = localStorage.getItem('questions');
        const storedQuestions = storedQuestionsJSON ? JSON.parse(storedQuestionsJSON) : [];
        const storedReviewsJSON = localStorage.getItem('reviews');
        const storedReviews = storedReviewsJSON ? JSON.parse(storedReviewsJSON) : [];

        setSales(storedSales);
        setSalesRevenue(storedSalesRevenue);
        setQuestions(storedQuestions);
        setReviews(storedReviews);
    }, []);
    return(
        <div className="container">
            <h1 classname="totalCost">Hello</h1>
            <h1>Admin Page</h1>
            

            <div className="filterItem-3">
                All Sales: {sales} All Sales Revenue: {salesRevenue}
            </div>
            <div>
            {questions.length > 0 ? (
                questions.map((question, index) => (
                <div className="filterItem-1" key={index}>
                    <div>
                        QUESTION:
                    </div>
                    <div>
                    {question.question_text}
                    </div>
                </div>
                ))) : (
            <div>
                No questions available.
            </div>

            )}
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                <div className="filterItem-2" key={index}>
                    <div>
                    REVIEW:
                    </div>
                    <div>
                    Rating: {review.rating}  
                    </div>
                    <div>  
                    Review: {review.review_text}
                    {console.log(">>>>>>>>>", review.review_text)}
                    </div>
                </div>
                ))
            ) : (
                <p>No reviews available.</p>
            )}
                </div>
                
            </div>

    )
}
export default AdminPage;
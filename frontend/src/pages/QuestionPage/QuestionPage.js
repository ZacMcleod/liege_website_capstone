import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import preventDefault from 'react';

const QuestionPage = () => {

    const {item_id} = useParams();
    const [userQuestion, setUserQuestion] = useState("");
    const [questions, setQuestions] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [user, token] = useAuth();

    const getQuestions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/questions');
            console.log(response.data);
            setQuestions(response.data);
            setIsLoading(false);
            localStorage.setItem('questions', JSON.stringify(response.data));
        }   
        catch (err) {
            console.error(err);
        }
    }

    const postQuestion = async (e) => {
        e.preventDefault();
        const postedQuestion = {
            "clothing_item_id": item_id,
            "question_text": userQuestion,
            "user_id": user.id
        }
    console.log(postedQuestion);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/post_question', postedQuestion,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
            getQuestions()
            console.log(postedQuestion);
            setIsLoading(false);
            
        }   
        catch (err) {
            console.error(err);
        }
    }

    const questionFilter = (item_id) => {
        const filteredQuestions = questions.filter(q => q.clothing_item_id === Number(item_id))
        
        return filteredQuestions;
    }
    

    useEffect(() => {
        getQuestions();
        }, []);

    return (
        
        <div>
            <div className="container">
                    <label>Question?: </label>
                    <input onChange={(e) => setUserQuestion(e.target.value)} value={userQuestion} ></input>
                    <button onClick={(e) => postQuestion(e)}>Submit Question</button>
                </div>
            {isLoading ? (
                <div>L O A D I N G . . . . .</div>
            ) : (
                <div className="clothingItem-container">
                    {questionFilter(item_id).map(question => 
                        <div key={question.id} className="clothingItem">
                            <div>
                                {user.username}:
                            </div>
                            <p>Question: {question.question_text}</p>
                        </div>
                        )
                    }
                </div>
            )};
        </div>
    )
}

export default QuestionPage;
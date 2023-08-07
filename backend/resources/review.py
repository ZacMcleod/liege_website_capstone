from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, User
from database.schemas import review_schema, reviews_schema

class ReviewsResource(Resource):
    def get(self):
        reviews = Review.query.all()
        serialized_reviews = reviews_schema.dump(reviews)
        return serialized_reviews, 200
    
class ReviewResource(Resource):
    def get(self, item_id):
        review = Review.query.get(item_id)
        serialized_review = review_schema.dump(review)
        return serialized_review, 200

class PostReviewResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_review = review_schema.load(form_data)
        new_review.user_id = user_id
        db.session.add(new_review)
        db.session.commit()
        return review_schema.dump(new_review), 201
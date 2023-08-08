from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, User
from database.schemas import question_schema, questions_schema

class QuestionsResource(Resource):
    def get(self):
        questions = Review.query.all()
        serialized_questions = question_schema.dump(questions)
        return serialized_questions, 200
    
class QuestionResource(Resource):
    def get(self, item_id):
        question = Review.query.get(item_id)
        serialized_question = question_schema.dump(question)
        return serialized_question, 200

class PostQuestionResource(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        form_data = request.get_json()
        new_question = question_schema.load(form_data)
        new_question.user_id = user.id
        db.session.add(new_question)
        db.session.commit()
        return question_schema.dump(new_question), 201
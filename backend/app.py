from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_migrate import Migrate
from database.models import db
from database.schemas import ma
from resources.auth import LoginResource, RegisterResource
from resources.cars import AllCarResource, UserCarResource
from resources.clothing_item import ClothingItemsResource, ClothingItemResource, PostClothingItemResource, DeleteClothingItemResource
from resources.review import ReviewsResource, ReviewResource, PostReviewResource
from resources.question import QuestionsResource, QuestionResource, PostQuestionResource
from resources.cart_item import CartItemsResource, CartItemResource, PostCartItemResource, DeleteCartItemResource
from dotenv import load_dotenv
from os import environ

# Adds variables from .env file to environment
load_dotenv()

# Creates instances of additional libraries
bcrypt = Bcrypt()
jwt= JWTManager()
cors = CORS()
migrate = Migrate()

def create_app():
    """
    App factory that creates app instance
    """
    # Creates app instance
    app = Flask(__name__)

    # Loads config properties from .env file
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')

    # Registers all routes with API
    api = create_routes()

    # Registers Flask app with additional libraries created/imported above
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    migrate.init_app(app, db)

    return app


def create_routes():
    """
    Creates Flask Restful instance and registers all Resource routes
    """
    api = Api()
    api.add_resource(RegisterResource, '/api/auth/register')
    api.add_resource(LoginResource, '/api/auth/login')
    api.add_resource(AllCarResource, '/api/cars')
    api.add_resource(UserCarResource, '/api/user_cars')
    # TODO: Create files for your Resources in resources folder, add them here

    # Clothing Item
    api.add_resource(ClothingItemsResource, '/api/clothing_items')
    api.add_resource(ClothingItemResource, '/api/clothing_item/<int:item_id>')
    api.add_resource(PostClothingItemResource, '/api/post_clothing_item')
    api.add_resource(DeleteClothingItemResource, '/api/delete_clothing_item/<int:item_id>')

    # Review
    api.add_resource(ReviewsResource, '/api/reviews')
    api.add_resource(ReviewResource, '/api/review/<int:item_id>')
    api.add_resource(PostReviewResource, '/api/post_review')

    # Question
    api.add_resource(QuestionsResource, '/api/questions')
    api.add_resource(QuestionResource, '/api/question/<int:item_id>')
    api.add_resource(PostQuestionResource, '/api/post_question')

    # Cart Item
    api.add_resource(CartItemsResource, '/api/cart_items')
    api.add_resource(CartItemResource, '/api/cart_item/<int:item_id>')
    api.add_resource(PostCartItemResource, '/api/post_cart_item')
    api.add_resource(DeleteCartItemResource, '/api/delete_cart_item/<int:item_id>')
    return api

from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car, Review, Question, ClothingItem

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    is_admin = fields.Boolean(required=True)
    class Meta:
        fields = ("id", "username", "password", "first_name", "last_name", "email", "is_admin")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    is_admin = fields.Boolean(required=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email", "is_admin")

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below


class ReviewSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    clothing_item_id = fields.Integer(required=True)
    review_text = fields.String(required=False)
    rating = fields.Integer(required=False)
    user_id = fields.Integer(required=True)

    @post_load
    def create_review(self, data, **kwargs):
        return Review(**data)

class ClothingItemSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    type = fields.String(required=True)
    description = fields.String(required=True)
    color = fields.String(required=True)
    size = fields.String(required=True)
    date = fields.Date(required=False)
    price = fields.Float(required=True)
    picture = fields.String(required=True)

    @post_load
    def create_clothing_item(self, data, **kwargs):
        return ClothingItem(**data)

class QuestionSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    question_text = fields.String(required=False)
    user_id = fields.Integer(required=True)
    response = fields.String(required=False)
    clothing_item_id = fields.Integer(required=False)

    @post_load
    def create_question(self, data, **kwargs):
        return Question(**data)
    
class CartSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    clothing_item_id = fields.Integer(required=True)
    user_id = fields.Integer(required=True)
    
review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)
clothing_item_schema = ClothingItemSchema()
clothing_items_schema = ClothingItemSchema(many=True)
question_schema = QuestionSchema()
questions_schema = QuestionSchema(many=True)
cart_schema = CartSchema()
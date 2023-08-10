from flask import request, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from database.models import db, ClothingItem, User
from database.schemas import register_schema, user_schema, clothing_item_schema, clothing_items_schema
from marshmallow import ValidationError
import datetime

class ClothingItemsResource(Resource):
    def get(self):
        clothing_items = ClothingItem.query.all()
        serialized_clothing_items = clothing_items_schema.dump(clothing_items)
        return serialized_clothing_items, 200
    
class ClothingItemResource(Resource):
    def get(self, item_id):
        clothing_item = ClothingItem.query.get(item_id)
        serialized_clothing_item = clothing_item_schema.dump(clothing_item)
        return serialized_clothing_item, 200
    
class PostClothingItemResource(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if user.is_admin == True:
            form_data = request.get_json()
            new_clothing_item = clothing_item_schema.load(form_data)
            new_clothing_item.user_id = user.id
            db.session.add(new_clothing_item)
            db.session.commit()
            return clothing_item_schema.dump(new_clothing_item), 201
        else:
            return {'message': 'You are not an admin. You are not Authorized to add clothing items'}, 401
        
class DeleteClothingItemResource(Resource):
    @jwt_required()
    def delete(self, item_id):
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        clothing_item = ClothingItem.query.get(item_id)
        if user.is_admin == True:
            if clothing_item == None:
                response = {'message': 'This is not an Item, so you cannot delete'}
                return make_response(response, 404)
            else:
                db.session.delete(clothing_item)
                db.session.commit()
                response = {'message': 'Item deleted Successfully!'}
                return make_response(response, 204)
        else:
            return {'message': 'You are not an admin. You are not Authorized to delete clothing items'}, 401
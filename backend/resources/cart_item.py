from flask import request, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, CartItem, User
from database.schemas import cart_item_schema, cart_items_schema

class CartItemsResource(Resource):
    @jwt_required()
    def get(self):
        cart_items = CartItem.query.all()
        serialized_cart_items = cart_items_schema.dump(cart_items)
        if serialized_cart_items != {}:
            return serialized_cart_items, 200
        else:
            return {'message': 'You have no items in your cart'}, 404
        
class CartItemResource(Resource):
    @jwt_required()
    def get(self, item_id):
        cart_item = CartItem.query.get(item_id)
        serialized_cart_item = cart_item_schema.dump(cart_item)
        if serialized_cart_item != {}:
            return serialized_cart_item, 200
        else:
            response = {'message': 'This item id does not exist in your cart'}
            return make_response(response, 404)
        
class PostCartItemResource(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        form_data = request.get_json()
        new_cart_item = cart_item_schema.load(form_data)
        new_cart_item.user_id = user.id
        db.session.add(new_cart_item)
        db.session.commit()
        return cart_item_schema.dump(new_cart_item), 201
    
class DeleteCartItemResource(Resource):
    @jwt_required()
    def delete(self, item_id):
        cart_item = CartItem.query.get(item_id)
        db.session.delete(cart_item)
        db.session.commit()
        response = {'message': f'Removed {cart_item.type} from Cart Items!'}
        return make_response(response, 200)
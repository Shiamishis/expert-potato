import logging

from flask import Blueprint, jsonify, request
from sqlalchemy import MetaData

from models import Rating, Review, Recipe, Group, User, db
from sqlalchemy import inspect

main = Blueprint('main', __name__)
logging.basicConfig(level=logging.DEBUG)

@main.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    logging.debug(f"Received data: {data}")
    new_user = User(username=data['username'], password=data['password'], email="email")
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@main.route('/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    logging.debug(f"Received data: {data}")
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 404

@main.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@main.route('/users/groups', methods=['GET'])
def get_users_groups():
    user_id = request.args.get('user_id')
    logging.debug(f"Received user_id: {user_id}")
    user = User.query.get(user_id)
    logging.debug(f"Received user: {user.to_dict()}")
    if user:
        response = jsonify([group.to_dict() for group in user.groups])
        return response
    else:
        return jsonify({"error": "User not found"}), 404

@main.route('/groups', methods=['GET'])
def get_group_by_group_id():
    data = request.get_json()
    group_id = data['groupId']
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404
    logging.debug("Recipes below")
    logging.debug(group.recipes)
    return jsonify(group.to_dict()), 200

@main.route('/groups/create', methods=['POST'])
def add_group():
    data = request.get_json()
    logging.debug(data)
    name = data['info']
    user_id = data['userId']
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    new_group = Group(name=name)
    user.groups.append(new_group)
    logging.debug(new_group.to_dict())
    db.session.add(new_group)
    db.session.commit()
    return jsonify(new_group.to_dict()), 201

@main.route('/groups/join', methods=['POST'])
def join_group():
    data = request.get_json()
    code_number = data['info']
    logging.debug(f"Received code_number: {code_number}")
    user_id = data['userId']
    group = Group.query.filter_by(code_number=code_number).first()
    logging.debug(f"Group: {group.to_dict()}")
    if group:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        user.groups.append(group)
        db.session.commit()
        return jsonify(group.to_dict()), 200
    else:
        return jsonify({"error": "Group not found"}), 404

@main.route('/groups', methods=['GET'])
def get_groups():
    groups = Group.query.all()
    return jsonify([group.to_dict() for group in groups])

@main.route('/recipes', methods=['POST'])
def add_recipe():
    data = request.get_json()
    new_recipe = Recipe(name=data['name'], description=data['description'], user_id=data['user_id'], group_id=data.get('group_id'))
    logging.debug("New recipe: "+new_recipe.name)
    group = Group.query.filter_by(id=data.get('group_id')).first()
    group.recipes.append(new_recipe)
    logging.debug("Group: "+group.name)
    logging.debug("Number of recipes in group: "+str(len(group.recipes)))
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify(new_recipe.to_dict()), 201

@main.route('/recipes/all', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes])

@main.route('/recipes', methods=['GET'])
def get_recipes_by_group():
    data = request.get_json()
    group_id = data['groupId']
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404
    recipes = group.recipes
    logging.debug(recipes[0].to_dict())
    return jsonify([recipe.to_dict() for recipe in recipes]), 200

@main.route('/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    new_review = Review(text=data['text'], recipe_id=data['recipe_id'])
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

@main.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews])

@main.route('/ratings', methods=['POST'])
def add_rating():
    data = request.get_json()
    new_rating = Rating(stars=data['stars'], recipe_id=data['recipe_id'])
    db.session.add(new_rating)
    db.session.commit()
    return jsonify(new_rating.to_dict()), 201

@main.route('/ratings', methods=['GET'])
def get_ratings():
    ratings = Rating.query.all()
    return jsonify([rating.to_dict() for rating in ratings])

@main.route('/check-tables')
def check_tables():
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    return ', '.join(tables)

@main.route('/tables', methods=['GET'])
def list_tables():
    metadata = MetaData()
    # Reflect the database tables
    metadata.reflect(bind=db.engine)

    # Get table names
    table_names = metadata.tables.keys()

    # Return table names as JSON response
    return jsonify({'tables': list(table_names)})

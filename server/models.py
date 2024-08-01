import string
import random
import uuid

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_group = db.Table('user_group',
                      db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                      db.Column('group_id', db.Integer, db.ForeignKey('group.id'), primary_key=True)
                      )


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False, unique=True)
    username = db.Column(db.String(80), nullable=False, autoincrement=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False)
    groups = db.relationship('Group', secondary=user_group, backref=db.backref('users', lazy=True))

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.groups = []

    def to_dict(self):
        return {"id": self.id, "username": self.username, "email": self.email}


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code_number = db.Column(db.String(80), nullable=False, unique=True)
    name = db.Column(db.String(80), nullable=False)
    recipes = db.relationship('Recipe', backref='group', lazy=True)

    def to_dict(self):
        return {"id": self.id, "code_number": self.code_number, "name": self.name, "recipes": [recipe.to_dict() for recipe in self.recipes]}

    def __init__(self, name):
        self.name = name
        self.code_number = self.generate_code_number()
        self.recipes = []

    def generate_code_number(self, length=100):
        characters = string.ascii_letters + string.digits
        return ''.join(random.choices(characters, k=length))


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=True)
    reviews = db.relationship('Review', backref='recipe', lazy=True)
    ratings = db.relationship('Rating', backref='recipe', lazy=True)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "description": self.description, "user_id": self.user_id,
                "group_id": self.group_id}


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    def to_dict(self):
        return {"id": self.id, "text": self.text, "recipe_id": self.recipe_id}


class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    def to_dict(self):
        return {"id": self.id, "stars": self.stars, "recipe_id": self.recipe_id}

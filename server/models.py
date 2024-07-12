from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_group = db.Table('user_group',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    surname = db.Column(db.String(80), nullable=False)
    groups = db.relationship('Group', secondary=user_group, backref=db.backref('users', lazy=True))

    def to_dict(self):
        return {"id": self.id, "name": self.name, "surname": self.surname}

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    recipes = db.relationship('Recipe', backref='group', lazy=True)

    def to_dict(self):
        return {"id": self.id, "name": self.name}

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=True)
    reviews = db.relationship('Review', backref='recipe', lazy=True)
    ratings = db.relationship('Rating', backref='recipe', lazy=True)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "description": self.description, "user_id": self.user_id, "group_id": self.group_id}

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

"""Flask app for Cupcakes"""
from flask import Flask, request, jsonify, render_template

from models import db, connect_db, Cupcake
from forms import AddCupcake

app = Flask(__name__)

app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)

@app.route('/', methods=["GET", "POST"])
def display_home_page(): 
    cupcakes = Cupcake.query.all()
    form = AddCupcake()
    if request.method == "POST":
        if form.validate_on_submit():
            return jsonify(data=form.text.data)
        else: 
            return jsonify(data=form.errors)
    return render_template('home.html', cupcakes=cupcakes, form=form)

@app.route('/api/cupcakes')
def display_cupcakes():
    all_cupcakes = [cupcake.serialize() for cupcake in  Cupcake.query.all()]
    return jsonify(cupcakes=all_cupcakes)

@app.route('/api/cupcakes/<int:id>')
def display_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify( cupcake=cupcake.serialize())

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    if request.json["image"] == "": 
        new_cupcake = Cupcake(flavor=request.json["flavor"], size=request.json["size"], rating=request.json["rating"], image="https://tinyurl.com/demo-cupcake")
    else: 
        new_cupcake = Cupcake(flavor=request.json["flavor"], size=request.json["size"], rating=request.json["rating"], image=request.json["image"])
    # \note this is your way you are getting around request.json["image"] returning an empty string so no default is applied. Ask mentor about this 
    
    # raise ValueError(type(request.json['image']))
    db.session.add(new_cupcake)
    db.session.commit()
    return (jsonify(cupcake=new_cupcake.serialize()), 201)

@app.route('/api/cupcakes/<int:id>', methods=["PATCH"])
def update_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    values = request.get_json()["cupcake"]
    # values = request.get_json()
    
    
    # raise ValueError(values)
            
    cupcake.flavor = values.get('flavor', cupcake.flavor)
    cupcake.size = values.get('size', cupcake.size)
    cupcake.rating = values.get('rating', cupcake.rating)
    cupcake.image = values.get('image', cupcake.image)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:id>', methods=["DELETE"])
def delete_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="deleted")
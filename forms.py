from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField, URLField
from wtforms.validators import InputRequired, Optional, URL, NumberRange 

class AddCupcake(FlaskForm):
    """Form for adding cupcake"""
    flavor = StringField("Flavor", validators=[InputRequired(message="Flavor cannot be blank.")])
    size = SelectField("Size", choices=[('small', 'small'), ('medium', 'medium'), ('large', 'large')])
    rating = FloatField("How many stars", validators=[InputRequired(message="Must have a rating between 1 and 10"), NumberRange(min=1, max=10)])
    image = URLField("Image URL", validators=[URL()])
 

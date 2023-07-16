from flask import Flask,jsonify,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://pucho243:Vm155795530.@pucho243.mysql.pythonanywhere-services.com/pucho243$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db= SQLAlchemy(app)
ma=Marshmallow(app)

class Laboratorio(db.Model):   # la clase Laboratorio hereda de db.Model
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre = db.Column(db.String(255))
    direccion = db.Column(db.String(255))
    telefono = db.Column(db.String(20))
    director = db.Column(db.String(50))
    sitio_web = db.Column(db.String(255))
    def __init__(self,id,nombre, direccion, telefono, director, sitio_web):   #crea el  constructor de la clase
        self.id = id
        self.nombre = nombre
        self.direccion = direccion
        self.telefono = telefono
        self.director = director
        self.sitio_web = sitio_web

with app.app_context():
    db.create_all()

class LaboratorioSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','direccion','telefono','director', 'sitio_web')

laboratorio_schema=LaboratorioSchema()            # El objeto laboratorio_schema es para traer un laboratorio
laboratorios_schema=LaboratorioSchema(many=True) # El objeto laboratorios_schema es para traer multiples registros de laboratorio

# crea los endpoint o rutas (json)

@app.route("/")
def helloWorld():
    return "Hello, cross-origin-world!"

@app.route('/laboratorios', methods=['GET'])
def get_laboratorios():
    all_laboratorios=Laboratorio.query.all()
    result=laboratorios_schema.dump(all_laboratorios)
    return jsonify(result)

@app.route('/laboratorios/<id>', methods=['GET'])
def get_laboratorio(id):
    laboratorio=Laboratorio.query.get(id)
    return laboratorio_schema.jsonify(laboratorio)

@app.route('/laboratorios/<id>', methods=['DELETE'])
def delete_laboratorio(id):
    laboratorio=Laboratorio.query.get(id)
    db.session.delete(laboratorio)
    db.session.commit()
    return laboratorio_schema.jsonify(laboratorio)

@app.route('/laboratorios', methods=['POST'])
def create_laboratorio():
    id=request.json['id']
    nombre=request.json['nombre']
    direccion=request.json['direccion']
    telefono=request.json['telefono']
    director=request.json['director']
    sitio_web=request.json['sitio_web']
    new_laboratorio=Laboratorio(id,nombre,direccion,telefono,director,sitio_web)
    db.session.add(new_laboratorio)
    db.session.commit()
    return laboratorio_schema.jsonify(new_laboratorio)

@app.route('/laboratorios/<id>' ,methods=['PUT'])
def update_laboratorio(id):
    laboratorio=Laboratorio.query.get(id)
    laboratorio.nombre=request.json['nombre']
    laboratorio.direccion=request.json['direccion']
    laboratorio.telefono=request.json['telefono']
    laboratorio.director=request.json['director']
    laboratorio.sitio_web=request.json['sitio_web']
    db.session.commit()
    return laboratorio_schema.jsonify(laboratorio)





@app.route('/')
def hello_world():
    return 'Hello from Flask!'
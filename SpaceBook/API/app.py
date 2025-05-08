from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from config import Config
from controller.user_controller import user_bp
from auth_controller import auth_bp
from flask_migrate import Migrate

# Instanciando o db aqui (removendo a redefinição em outro lugar)
db = SQLAlchemy()

# Criando a aplicação Flask
app = Flask(__name__)
app.config.from_object(Config)

# Inicializa as extensões
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

# Registrando os Blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Rota de verificação
@app.route('/')
def home():
    return jsonify({"mensagem": "API SpaceBook ativa"})

# Rota protegida de teste
@app.route('/api/teste', methods=['GET'])
@jwt.required()
def teste_jwt():
    return jsonify(message="Autenticação bem-sucedida"), 200

# Rodando a aplicação
if __name__ == '__main__':
    app.run(port=5000, debug=True)

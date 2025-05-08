from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from API.config import Config

# Inicializando o banco de dados
db = SQLAlchemy()

def create_app():
    # Criação da aplicação Flask
    app = Flask(__name__)

    # Configurações do banco de dados
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{Config.MYSQL_USER}:{Config.MYSQL_PASSWORD}@{Config.MYSQL_HOST}:{Config.MYSQL_PORT}/{Config.MYSQL_DB}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Desabilita a modificação de objetos no banco de dados

    # Inicializa o banco de dados com a aplicação
    db.init_app(app)

    # Registra os blueprints (caso haja)
    from API.controller.user_controller import user_bp
    app.register_blueprint(user_bp, url_prefix='/api')

    return app

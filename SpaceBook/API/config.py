from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask_jwt_extended import JWTManager

app = Flask(__name__)

# Configurações do MySQL e JWT
class Config:
    MYSQL_HOST = 'localhost'
    MYSQL_PORT = 3306
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'SpaceBook'
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:@localhost/SpaceBook'
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Desativa a notificação de modificações
    SECRET_KEY = 'chave_super_secreta'  # Chave secreta para o Flask
    JWT_SECRET_KEY = 'sua_chave_secreta_jwt'  # Chave secreta para o JWT
# Inicializa as extensões
mysql = MySQL(app)
jwt = JWTManager(app)

@app.route('/')
def home():
    return "API SpaceBook está funcionando!"

@app.route('/test-db')
def test_db():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT DATABASE();")
        result = cursor.fetchone()
        cursor.close()
        return jsonify({"message": "Conexão com o MySQL bem-sucedida!", "database": result[0]}), 200
    except Exception as e:
        return jsonify({"message": "Erro ao conectar com o MySQL", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

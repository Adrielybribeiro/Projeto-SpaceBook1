from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from repositories.user_repository import UserRepository
from models.user import User

auth_bp = Blueprint('auth', __name__)
user_repo = UserRepository()

# -------- ROTA DE CADASTRO --------
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')

    if not nome or not email or not senha:
        return jsonify({"message": "Nome, email e senha são obrigatórios"}), 400

    # Verificar se o email já está registrado
    if user_repo.buscar_por_email(email):
        return jsonify({"message": "Email já registrado"}), 400

    # Criar o usuário
    novo_user = User.criar_com_senha(nome, email, senha)

    # Salvar no banco
    try:
        user_repo.salvar_user(novo_user)
        return jsonify({"message": "Usuário criado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"message": "Erro ao criar usuário", "error": str(e)}), 500


# -------- ROTA DE LOGIN --------
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({"message": "Email e senha são obrigatórios"}), 400

    user = user_repo.buscar_por_email(email)
    if user and user.verify_password(senha):
        # Criar token JWT
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

    return jsonify({"message": "Credenciais inválidas"}), 401

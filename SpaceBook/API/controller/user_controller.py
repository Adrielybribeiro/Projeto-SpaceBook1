from flask import Blueprint, request, jsonify
from repositories.user_repository import UserRepository
from models.user import User

user_bp = Blueprint('user_controller', __name__)
user_repo = UserRepository()

# ---------- ROTA DE CADASTRO DE USUÁRIO ----------
@user_bp.route('/cadastro', methods=['POST'])
def cadastrar_usuario():
    dados = request.get_json()
    nome = dados.get('nome')
    email = dados.get('email')
    senha = dados.get('senha')

    if not nome or not email or not senha:
        return jsonify({"erro": "Nome, email e senha são obrigatórios."}), 400

    # Verifica se o e-mail já está cadastrado
    if user_repo.buscar_por_email(email):
        return jsonify({"erro": "E-mail já cadastrado."}), 409

    try:
        novo_usuario = User(nome=nome, email=email, senha=senha)
        resultado = user_repo.inserir(novo_usuario)

        if 'error' in resultado:
            return jsonify({"erro": resultado['error']}), 500

        return jsonify({"mensagem": "Usuário cadastrado com sucesso!"}), 201

    except Exception as e:
        return jsonify({"erro": f"Erro ao cadastrar: {str(e)}"}), 500

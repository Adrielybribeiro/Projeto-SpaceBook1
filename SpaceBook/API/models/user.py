# models/user.py
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, id, nome, email, senha_hash):
        self.id = id
        self.nome = nome
        self.email = email
        self.senha_hash = senha_hash

    @staticmethod
    def criar_com_senha(nome, email, senha):
        senha_hash = generate_password_hash(senha)
        return User(id=None, nome=nome, email=email, senha_hash=senha_hash)

    def verify_password(self, senha):
        return check_password_hash(self.senha_hash, senha)

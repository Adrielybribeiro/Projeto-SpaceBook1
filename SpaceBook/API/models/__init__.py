import re

class Usuario:
    def __init__(self, id, nome, email, senha):
        self.id = id
        self.nome = nome
        self.email = self.validar_email(email)
        self.senha = senha

    def validar_email(self, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError(f"Email '{email}' não é válido")
        return email

    def __repr__(self):
        return f"Usuario(id={self.id}, nome={self.nome}, email={self.email})"

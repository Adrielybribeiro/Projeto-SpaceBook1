from flask import current_app
from flask_mysqldb import MySQL
from models.user import User

class UserRepository:

    def __init__(self):
        self.mysql = MySQL(current_app)

    def buscar_por_email(self, email):
        cursor = self.mysql.connection.cursor()
        cursor.execute("SELECT id, nome, email, senha FROM usuarios WHERE email = %s", (email,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return User(id=row[0], nome=row[1], email=row[2], senha_hash=row[3])
        return None

    def salvar_user(self, user):
        cursor = self.mysql.connection.cursor()
        cursor.execute("""
            INSERT INTO usuarios (nome, email, senha) 
            VALUES (%s, %s, %s)
        """, (user.nome, user.email, user.senha_hash))
        self.mysql.connection.commit()  # Confirma a inserção
        cursor.close()

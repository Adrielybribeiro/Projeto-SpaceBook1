from API.repositories.user_repository import UserRepository

class UserWorker:
    def __init__(self):
        self.repo = UserRepository()

    def listar_usuarios(self):
        return self.repo.obter_todos()

    def criar_usuario(self, dados):
        return self.repo.inserir(dados)
    
    def buscar_por_email(self, email):
        return self.repo.buscar_por_email(email)


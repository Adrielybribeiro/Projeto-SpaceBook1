from database import db

class Livro(db.Model):
    __tablename__ = 'livros'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    genero = db.Column(db.String(100))
    ano_publicacao = db.Column(db.Integer)

    def __init__(self, titulo, autor, descricao, genero, ano_publicacao):
        self.titulo = titulo
        self.autor = autor
        self.descricao = descricao
        self.genero = genero
        self.ano_publicacao = ano_publicacao

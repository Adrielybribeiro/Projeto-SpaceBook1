from database import db

class Avaliacao(db.Model):
    __tablename__ = 'avaliacoes'

    id = db.Column(db.Integer, primary_key=True)
    livro_id = db.Column(db.Integer, db.ForeignKey('livros.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    avaliacao = db.Column(db.Integer, nullable=False)
    comentario = db.Column(db.Text)

    livro = db.relationship('Livro', backref='avaliacoes')
    usuario = db.relationship('User', backref='avaliacoes')

    def __init__(self, livro_id, usuario_id, avaliacao, comentario=None):
        self.livro_id = livro_id
        self.usuario_id = usuario_id
        self.avaliacao = avaliacao
        self.comentario = comentario

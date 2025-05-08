from database import db

class Favorito(db.Model):
    __tablename__ = 'favoritos'

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    livro_id = db.Column(db.Integer, db.ForeignKey('livros.id'), nullable=False)
    data_favoritado = db.Column(db.DateTime, default=db.func.current_timestamp())

    usuario = db.relationship('User', backref='favoritos')
    livro = db.relationship('Livro', backref='favoritos')

    def __init__(self, usuario_id, livro_id, data_favoritado=None):
        self.usuario_id = usuario_id
        self.livro_id = livro_id
        self.data_favoritado = data_favoritado

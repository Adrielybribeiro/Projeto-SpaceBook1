from database import db

class Leitura(db.Model):
    __tablename__ = 'leituras'

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    livro_id = db.Column(db.Integer, db.ForeignKey('livros.id'), nullable=False)
    pagina_atual = db.Column(db.Integer, default=1)
    data_inicio = db.Column(db.Date)
    data_ultima_leitura = db.Column(db.DateTime)

    usuario = db.relationship('User', backref='leituras')
    livro = db.relationship('Livro', backref='leituras')

    def __init__(self, usuario_id, livro_id, pagina_atual=1, data_inicio=None, data_ultima_leitura=None):
        self.usuario_id = usuario_id
        self.livro_id = livro_id
        self.pagina_atual = pagina_atual
        self.data_inicio = data_inicio
        self.data_ultima_leitura = data_ultima_leitura

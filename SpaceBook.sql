-- Criar o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS SpaceBook;
USE SpaceBook;

-- Remover tabelas com dependências
DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS leituras;
DROP TABLE IF EXISTS avaliacoes;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS users;

-- Criar a tabela 'users'
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Criar a tabela 'livros'
CREATE TABLE IF NOT EXISTS livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    descricao TEXT,
    genero VARCHAR(100),
    ano_publicacao INT
);

-- Criar a tabela 'avaliacoes'
CREATE TABLE IF NOT EXISTS avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    livro_id INT,
    usuario_id INT,
    avaliacao INT CHECK (avaliacao >= 1 AND avaliacao <= 5),
    comentario TEXT,
    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Criar a tabela 'leituras'
CREATE TABLE IF NOT EXISTS leituras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    pagina_atual INT DEFAULT 1,
    data_inicio DATE,
    data_ultima_leitura DATETIME,
    CONSTRAINT fk_leitura_usuario FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_leitura_livro FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE
);

-- Criar a tabela 'favoritos'
CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    data_favoritado DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favorito_usuario FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_favorito_livro FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, livro_id) -- impede duplicidade
);

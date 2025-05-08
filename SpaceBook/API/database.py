import mysql.connector
from config import Config
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_db_connection():
    """Cria e retorna uma conexão com o banco de dados MySQL."""
    try:
        connection = mysql.connector.connect(
            host=Config.MYSQL_HOST,
            port=Config.MYSQL_PORT,
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD,
            database=Config.MYSQL_DB
        )
        if connection.is_connected():
            print("Conexão com o MySQL bem-sucedida!")
        return connection
    except mysql.connector.Error as err:
        print(f"Erro ao conectar com o MySQL: {err}")
        return None

def close_db_connection(connection):
    """Fecha a conexão com o banco de dados."""
    if connection and connection.is_connected():
        connection.close()
        print("Conexão com o MySQL fechada.")
    else:
        print("Conexão já estava fechada ou inválida.")

def execute_query(connection, query, params=None):
    """Executa uma consulta no banco de dados e retorna o resultado."""
    cursor = connection.cursor()
    try:
        cursor.execute(query, params if params else ())
        result = cursor.fetchall()  # Ou cursor.fetchone() se for apenas um resultado
        return result
    except mysql.connector.Error as err:
        print(f"Erro na execução da consulta: {err}")
        return None
    finally:
        cursor.close()

# Usando a conexão de forma segura (exemplo de uso):
if __name__ == "__main__":
    # Cria a conexão
    connection = create_db_connection()

    # Verifica se a conexão foi bem-sucedida
    if connection:
        try:
            # Exemplo de consulta
            query = "SELECT * FROM sua_tabela"  # Substitua com sua consulta real
            result = execute_query(connection, query)

            if result:
                print(result)  # Imprime o resultado, mas cuidado com dados sensíveis
            else:
                print("Nenhum resultado encontrado.")
        finally:
            # Fechar a conexão ao final
            close_db_connection(connection)

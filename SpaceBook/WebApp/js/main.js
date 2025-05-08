// Função para cadastrar novo usuário e fazer login automático
function cadastrarUsuario() {
    const btn = document.getElementById('btnCadastrar');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    if (!btn || !btnText || !btnLoader) {
        console.error('Elementos do botão não encontrados.');
        return;
    }

    btn.disabled = true;
    btnText.textContent = 'Enviando...';
    btnLoader.classList.remove('hidden');

    const dados = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        senha: document.getElementById('senha').value.trim()
    };

    if (!dados.nome || !dados.email || !dados.senha) {
        alert("Preencha todos os campos!");
        resetBotao();
        return;
    }

    fetch('http://localhost:5000/api/usuarios/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (response.ok) {
            return fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: dados.email,
                    senha: dados.senha
                })
            });
        } else if (response.status === 409) {
            throw new Error('Este e-mail já está cadastrado!');
        } else {
            throw new Error('Erro ao cadastrar usuário. Tente novamente.');
        }
    })
    .then(loginResponse => {
        if (!loginResponse.ok) {
            throw new Error('Usuário cadastrado, mas erro ao fazer login automático.');
        }
        return loginResponse.json();
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        alert("Login automático realizado com sucesso!");
        window.location.href = "perfil.html";
    })
    .catch(error => {
        console.error("Erro:", error);
        alert(error.message || "Erro desconhecido.");
    })
    .finally(resetBotao);

    function resetBotao() {
        btn.disabled = false;
        btnText.textContent = 'Cadastrar';
        btnLoader.classList.add('hidden');
    }
}

// Função para login manual
function loginUsuario() {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();

    if (!email || !senha) {
        alert("Informe o e-mail e a senha.");
        return;
    }

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => {
        if (!response.ok) throw new Error("E-mail ou senha inválidos.");
        return response.json();
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        alert("Login realizado com sucesso!");
        window.location.href = "perfil.html";
    })
    .catch(error => {
        console.error("Erro no login:", error);
        alert(error.message);
    });
}

// Função para carregar perfil do usuário logado
function carregarPerfil() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Você precisa estar logado.");
        window.location.href = "login.html";
        return;
    }

    fetch('http://localhost:5000/api/usuarios/perfil', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error("Não foi possível carregar o perfil.");
        return response.json();
    })
    .then(usuario => {
        document.getElementById('perfilNome').textContent = usuario.nome;
        document.getElementById('perfilEmail').textContent = usuario.email;
        // outros campos conforme sua API
    })
    .catch(error => {
        console.error("Erro ao carregar perfil:", error);
        alert("Erro ao carregar o perfil. Faça login novamente.");
        window.location.href = "login.html";
    });
}

// Função para carregar os livros (simulação de API)
const loadBooks = () => {
    const books = [
        { title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', genre: 'Fantasia', cover: 'https://via.placeholder.com/150x200' },
        { title: 'Duna', author: 'Frank Herbert', genre: 'Ficção Científica', cover: 'https://via.placeholder.com/150x200' },
        { title: 'A Arte da Felicidade', author: 'Dalai Lama', genre: 'Autoajuda', cover: 'https://via.placeholder.com/150x200' },
        { title: 'Orgulho e Preconceito', author: 'Jane Austen', genre: 'Romance', cover: 'https://via.placeholder.com/150x200' },
        // Adicione mais livros simulados aqui
    ];

    const bookContainer = document.getElementById('book-container');
    books.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
          <img src="${book.cover}" alt="${book.title}" />
          <h3>${book.title}</h3>
          <p>Autor: ${book.author}</p>
          <p>Gênero: ${book.genre}</p>
        `;

        bookContainer.appendChild(bookCard);
    });
};

// Carregar livros ao iniciar a página
window.onload = loadBooks;

// Eventos de interação para os botões
document.getElementById('logout-link').addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('Logout realizado com sucesso!');
    window.location.href = 'index.html'; // Redireciona para a página inicial
});

document.getElementById('chat-btn').addEventListener('click', () => {
    window.location.href = 'chat.html'; // Redireciona para a página de chat
});

document.getElementById('readings-btn').addEventListener('click', () => {
    window.location.href = 'leituras.html'; // Redireciona para a página de leituras
});

document.getElementById('favorites-btn').addEventListener('click', () => {
    window.location.href = 'favoritos.html'; // Redireciona para a página de favoritos
});

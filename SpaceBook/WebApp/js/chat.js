// Função para carregar mensagens de chat
function carregarChat() {
    const token = localStorage.getItem('token');
    const usuarioAtual = localStorage.getItem('usuario');

    if (!token || !usuarioAtual) {
        alert("Você precisa estar logado.");
        window.location.href = "login.html";
        return;
    }

    fetch('http://localhost:5000/api/chat', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(mensagens => {
        const listaChat = document.getElementById('lista-chat');
        listaChat.innerHTML = ''; // Limpar mensagens anteriores

        mensagens.forEach(mensagem => {
            const li = document.createElement('li');

            const ehUsuario = mensagem.usuario === usuarioAtual;
            li.classList.add(ehUsuario ? 'user-message' : 'bot-message');
            li.textContent = `${ehUsuario ? 'Você' : 'Bot'}: ${mensagem.texto}`;

            listaChat.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar chat:", error);
        alert("Erro ao carregar mensagens.");
    });
}

// Função para enviar mensagem
document.getElementById('enviar-mensagem').addEventListener('click', () => {
    const mensagem = document.getElementById('mensagem').value.trim();
    if (mensagem) {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ texto: mensagem })
        })
        .then(response => response.json())
        .then(() => {
            document.getElementById('mensagem').value = ''; // Limpa o input
            carregarChat(); // Recarrega as mensagens
        })
        .catch(error => {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem.');
        });
    }
});

// Carrega o chat ao iniciar
carregarChat();

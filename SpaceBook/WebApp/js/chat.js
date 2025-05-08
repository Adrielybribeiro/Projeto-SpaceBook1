// Função para carregar mensagens de chat
function carregarChat() {
    const token = localStorage.getItem('token');
    if (!token) {
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
        listaChat.innerHTML = '';  // Limpar a lista antes de adicionar novas mensagens
        mensagens.forEach(mensagem => {
            const li = document.createElement('li');
            li.textContent = `${mensagem.usuario}: ${mensagem.texto}`;
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
            alert('Mensagem enviada com sucesso!');
            carregarChat(); // Atualizar a lista
        })
        .catch(error => {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem.');
        });
    }
});

// Chama a função para carregar o chat quando o arquivo JS for carregado
carregarChat();

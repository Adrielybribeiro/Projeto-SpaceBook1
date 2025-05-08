// Função para carregar favoritos
function carregarFavoritos() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Você precisa estar logado.");
        window.location.href = "login.html";
        return;
    }

    fetch('http://localhost:5000/api/favoritos', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(favoritos => {
        const listaFavoritos = document.getElementById('lista-favoritos');
        listaFavoritos.innerHTML = '';  // Limpar a lista antes de adicionar novos itens
        favoritos.forEach(favorito => {
            const li = document.createElement('li');
            li.textContent = favorito.nome;
            listaFavoritos.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar favoritos:", error);
        alert("Erro ao carregar favoritos.");
    });
}

// Função para adicionar novo favorito
document.getElementById('adicionar-favorito').addEventListener('click', () => {
    const novoFavorito = document.getElementById('novo-favorito').value.trim();
    if (novoFavorito) {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/favoritos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: novoFavorito })
        })
        .then(response => response.json())
        .then(() => {
            alert('Favorito adicionado com sucesso!');
            carregarFavoritos(); // Atualizar a lista
        })
        .catch(error => {
            console.error('Erro ao adicionar favorito:', error);
            alert('Erro ao adicionar favorito.');
        });
    }
});

// Chama a função para carregar os favoritos quando o arquivo JS for carregado
carregarFavoritos();

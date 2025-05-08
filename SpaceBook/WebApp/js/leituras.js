// Função para carregar leituras
function carregarLeituras() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Você precisa estar logado.");
        window.location.href = "login.html";
        return;
    }

    fetch('http://localhost:5000/api/leituras', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(leituras => {
        const listaLeituras = document.getElementById('lista-leituras');
        listaLeituras.innerHTML = '';  // Limpar a lista antes de adicionar novos itens
        leituras.forEach(leitura => {
            const li = document.createElement('li');
            li.textContent = leitura.titulo;
            listaLeituras.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar leituras:", error);
        alert("Erro ao carregar leituras.");
    });
}

// Função para adicionar nova leitura
document.getElementById('adicionar-leitura').addEventListener('click', () => {
    const novaLeitura = document.getElementById('nova-leitura').value.trim();
    if (novaLeitura) {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/leituras', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo: novaLeitura })
        })
        .then(response => response.json())
        .then(() => {
            alert('Leitura adicionada com sucesso!');
            carregarLeituras(); // Atualizar a lista
        })
        .catch(error => {
            console.error('Erro ao adicionar leitura:', error);
            alert('Erro ao adicionar leitura.');
        });
    }
});

// Chama a função para carregar as leituras quando o arquivo JS for carregado
carregarLeituras();

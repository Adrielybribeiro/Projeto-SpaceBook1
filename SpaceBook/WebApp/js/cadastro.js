document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Coletando os dados do formulário
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Preparando os dados para enviar
    const userData = {
        nome: username,
        email: email,
        senha: password
    };

    // Exibindo a mensagem de loading
    document.getElementById("loading-message").classList.remove("hidden");

    // Enviando os dados para a API
    fetch('http://localhost:5000/api/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(async response => {
        // Escondendo a mensagem de loading
        document.getElementById("loading-message").classList.add("hidden");

        if (!response.ok) {
            // Caso a resposta não seja ok, trate o erro aqui
            const data = await response.json().catch(() => null);
            const errorMsg = data?.message || "Erro ao cadastrar.";
            document.getElementById("error-message").innerText = errorMsg;
            document.getElementById("error-message").classList.remove("hidden");
            return;
        }

        // Verificando a resposta da API
        const data = await response.json().catch(() => null);

        if (data?.message === "Usuário cadastrado com sucesso") {
            window.location.replace("/login.html");
        } else {
            const errorMsg = data?.message || "Erro ao cadastrar.";
            document.getElementById("error-message").innerText = errorMsg;
            document.getElementById("error-message").classList.remove("hidden");
        }
    })
    .catch(error => {
        // Caso ocorra um erro na requisição
        document.getElementById("loading-message").classList.add("hidden");
        document.getElementById("error-message").innerText = "Erro ao cadastrar usuário. Tente novamente.";
        document.getElementById("error-message").classList.remove("hidden");
        console.error(error);
    });
});

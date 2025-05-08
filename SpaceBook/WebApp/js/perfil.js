document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token'); // ou 'authToken', padronize

    if (!token) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    fetch("http://localhost:5000/api/usuarios/perfil", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Falha ao autenticar ou buscar perfil.");
        }
        return response.json();
    })
    .then(usuario => {
        if (usuario.nome && usuario.email) {
            const nomeUsuario = document.getElementById("nomeUsuario");
            const nomeUsuario2 = document.getElementById("nomeUsuario2");
            const emailUsuario = document.getElementById("emailUsuario");

            if (nomeUsuario) nomeUsuario.textContent = usuario.nome;
            if (nomeUsuario2) nomeUsuario2.textContent = usuario.nome;
            if (emailUsuario) emailUsuario.textContent = usuario.email;
        } else {
            throw new Error("Dados incompletos no perfil.");
        }
    })
    .catch(err => {
        console.error("Erro ao buscar perfil:", err);
        alert("Erro ao carregar perfil. Faça login novamente.");
        localStorage.removeItem('token');
        window.location.href = "login.html";
    });
});

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

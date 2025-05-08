async function fazerLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();

    const loginText = document.getElementById("loginText");
    const loginLoader = document.getElementById("loginLoader");
    const errorDiv = document.getElementById("error-message");

    if (!email || !senha) {
        errorDiv.textContent = "Preencha todos os campos.";
        errorDiv.classList.remove("hidden");
        return;
    }

    loginLoader.classList.remove("hidden");
    loginText.classList.add("hidden");

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Erro no login.");
        }

        localStorage.setItem('token', data.access_token);
        window.location.href = "perfil.html";

    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove("hidden");
    } finally {
        loginLoader.classList.add("hidden");
        loginText.classList.remove("hidden");
    }
}

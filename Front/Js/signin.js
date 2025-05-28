document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const outputEmail = document.getElementById("outputEmail");
    const outputPassword = document.getElementById("outputPassword");

    outputEmail.innerText = "";
    outputPassword.innerText = "";

    // Validações
    if (!name || !email || !password || !confirmPassword) {
      outputEmail.innerText = "Todos os campos são obrigatórios.";
      return;
    }

    if (!email.includes("@")) {
      outputEmail.innerText = "E-mail inválido.";
      return;
    }

    if (password !== confirmPassword) {
      outputPassword.innerText = "As senhas não coincidem.";
      return;
    }

    // Envio para a API
    fetch("http://localhost:3000/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        email: email,
        senha: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar usuário");
        }
        return response.json();
      })
      .then((data) => {
        alert("Cadastro realizado com sucesso!");
        console.log("Usuário cadastrado:", data);
        document.getElementById("signupForm").reset();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao cadastrar. Tente novamente.");
      });
  });

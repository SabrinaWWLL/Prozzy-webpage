document.getElementById("sendBtn").addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("userMail").value.trim();
  const senha = document.getElementById("userPassword").value;

  const outputEmail = document.getElementById("outputEmail");
  const outputPassword = document.getElementById("outputPassword");
  const loader = document.getElementById("loader");

  outputEmail.innerText = "";
  outputPassword.innerText = "";

  if (!email || !senha) {
    outputEmail.innerText = "Preencha todos os campos.";
    return;
  }

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.mensagem || "Erro no login");
        });
      }
      return response.json();
    })
    .then((data) => {
      loader.innerHTML = `
        <div class="loader">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>`;
      setTimeout(() => {
        window.location.href = "landing_page.html";
      }, 3000);
    })
    .catch((error) => {
      outputEmail.innerText = error.message;
    });
});

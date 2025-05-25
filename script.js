document.getElementById("sendBtn").addEventListener("click", (event) => {
    event.preventDefault();

    // user info
    const userMail = document.getElementById("userMail").value.trim();
    const userPassword = document.getElementById("userPassword").value;
    
    // botão formulário + elemento output
    const outputEmail = document.getElementById("outputEmail");
    const outputPassword = document.getElementById("outputPassword");
    const loader = document.getElementById("loader");
    
    // user database
    let userDB = {
        Vini: "Mundano321",
        Sabrina: "Chique321",
        Bia: "theLast321",
        Thiago: "GTA321"
    }
    
    
    // verificador
    if (userMail === "") {
        outputEmail.innerText = "O campo do e-mail está vazio, preencha-o.";
        outputPassword.innerText = "O campo da senha está vazio, preencha-o.";
        return;
    }

    if (!(userMail in userDB)) {
        outputEmail.innerText = "Usuário não encontrado.";
        outputPassword.innerText = "";
        return;
    }

    if (!(userMail in userDB && userDB[userMail] === userPassword)) {
        outputEmail.innerText = "Usuário e senha não coincidem.";
        outputPassword.innerText = "";
        return;
    }

    if (userDB[userMail] === userPassword) {

        outputEmail.innerText = "";
        outputPassword.innerText = "";

        loader.innerHTML = `
            <div class="loader">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>`;


        setTimeout(() => {
            window.location.href = "landing_page.html"
        }, 3000);
    } else {
        output.innerText = "Senha errada."
    }

})
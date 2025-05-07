document.getElementById("sendBtn").addEventListener("click", (event) => {
    event.preventDefault();

    // user info
    const userMail = document.getElementById("userMail").value.trim();
    const userPassword = document.getElementById("userPassword").value;
    
    // botão formulário + elemento output
    const output = document.getElementById("output");
    
    // user database
    let userDB = {
        Vini: "Mundano321",
        Sabrina: "Chique321",
        Bia: "theLast321",
        Thiago: "GTA321"
    }
    
    
    // verificador
    if (userMail === "") {
        output.innerText = "Digite seu email";
        return;
    }

    if (!(userMail in userDB)) {
        output.innerText = "Usuário não encontrado";
        return;
    }

    if (userDB[userMail] === userPassword) {
        output.innerHTML = `
            <div class="loader">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>`
        ;


        setTimeout(() => {
            window.location.href = "landing_page.html"
        }, 3000);
    } else {
        output.innerText = "Senha errada."
    }

})
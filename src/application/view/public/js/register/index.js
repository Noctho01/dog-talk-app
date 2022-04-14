export default () => {
    document.getElementById("buttonCreate").addEventListener('click', async ()=> {
        const emailVal = document.getElementById("email").value;
        const passwordVal = document.getElementById("password").value;
        const passwordConfirmVal = document.getElementById("passwordConfirm").value;
        const alertBox = document.getElementById("alert_box");

        alertBox.innerHTML = ""

        if (!emailVal || !passwordVal || !passwordConfirmVal || emailVal === "" || passwordVal === "" || passwordConfirmVal === "") {
            alertBox.innerHTML += "<p>Preencha todos os campos para continuar</p>";

        } else if (passwordVal !== passwordConfirmVal) {
            alertBox.innerHTML += "<p>Senhas não são iguais</p>";

        } else {
            const urlPost = 'http://localhost:3030/api/v1/user';
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `email=${emailVal}&password=${passwordVal}`
            }

            try {
                const response = await fetch(urlPost, options)
                const responseInJson =  await response.json();

                if (responseInJson.error) alertBox.innerHTML = `<p>${responseInJson.error} <i>Status Code <b>${response.status}</b></i></p>`
                if (responseInJson.message && responseInJson.message === 'user created') {
                    window.alert('Conta criada com sucesso!');
                    localStorage.setItem("layerAtual", "LoginLayer")
                    location.reload();
                }
            } catch (err) {
                alertBox.innerHTML = `<p><b>Server Error:</b> <i>${err}</i></p>`;
            }
        }

    });
}
export default () => {
    document.getElementById("buttonLogin").addEventListener('click', async ()=> {
        const emailVal = document.getElementById("email").value;
        const passwordVal = document.getElementById("password").value;
        const alertBox = document.getElementById("alert_box");

        document.getElementById("button_register").addEventListener('click', async () => {
            localStorage.setItem("layerAtual", "RegisterLayer")
            location.reload();
        })

        alertBox.innerHTML = ""

        if (!emailVal || !passwordVal || emailVal === "" || passwordVal === "") {
            alertBox.innerHTML += "<p>Preencha todos os campos para continuar</p>";

        } else {
            const urlPost = 'http://localhost:3030/api/v1/user/login';
            const options = {
                method: 'POST',
                credentials: 'include',
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
                if (responseInJson.message && responseInJson.message === 'user token created') {
                    window.alert('Login feito com sucesso!');
                    localStorage.setItem("layerAtual", "RoomsLayer")
                    location.reload();
                }
                
            } catch (err) {
                alertBox.innerHTML = `<p><b>Server Error:</b> <i>${err}</i></p>`;
            }
        }

    });
}
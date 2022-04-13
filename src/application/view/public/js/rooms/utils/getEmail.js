export default async alertBox => {
    const seuEmail = document.getElementById("seuEmail");

    const urlGet = 'http://localhost:3030/api/v1/user/email';
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: { 
            'Accept': 'application/json'
        }
    }

    try {
        const response = await fetch(urlGet, options);
        const responseInJson = await response.json();

        if (responseInJson.error) {
            if (responseInJson.error == "Token expirado" || responseInJson.error == "Não existe token") {
                localStorage.setItem('layerAtual', 'LoginLayer');
                window.location.href = "/"
            }
            alertBox.innerHTML = `<p>${responseInJson.error} <i>Status Code <b>${response.status}</b></i></p>`
            
        } else if (responseInJson.email) {
            seuEmail.innerHTML = `Seu Email: <b><i>${responseInJson.email}</i></b>`;
        }

    } catch (err) {
        alertBox.innerHTML = `<p><b>Server Error:</b> <i>${err}</i></p>`;
    }
}
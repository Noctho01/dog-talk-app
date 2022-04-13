export default async () => {
    const url = "http://localhost:3030/api/v1/user/logout";
    const options = {
        method: 'DELETE',
        credentials: 'include',
        headers: { 
            'Accept': 'application/json'
        },
    }

    try {
        const response = await fetch(url, options);
        const responseInJson = await response.json();

        if (responseInJson.error) {
            if (responseInJson.error == "Token expirado" || responseInJson.error == "Não existe token") {
                localStorage.setItem('layerAtual', 'LoginLayer');
                return window.location.href = "/"
            }
            return { error: responseInJson.error, statusError: response.status }

        } else if (responseInJson.message && responseInJson.message === 'user token deleted') {
            localStorage.setItem("layerAtual", "LoginLayer")
            window.location.href = "/"
        }

    } catch (err) {
        console.log("ERROR", err)
        return { error: err, statusError: 500 }
    }
}
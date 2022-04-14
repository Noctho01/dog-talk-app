export default async () => {    
    const urlGet = 'http://localhost:3030/api/v1/canineProfile';
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: { 
            'Accept': 'application/json'
        },
    }

    try {
        const response = await fetch(urlGet, options);
        const responseInJson = await response.json();

        if (responseInJson.error) {
            if (responseInJson.error == "Token expirado"  || responseInJson.error == "Não existe token") {
                localStorage.setItem('layerAtual', 'LoginLayer');
                window.location.href = "/"
            }

            localStorage.setItem('layerAtual', 'RoomsLayer');
            window.location.href = "/"
            return { error: responseInJson.error, statusError: response.status }

        } else if (responseInJson.canineProfile && responseInJson.canineProfile.breed) {
            return { success: responseInJson.canineProfile }
        }


    } catch (err) {
        return { error: err, statusError: 500 }
    }
}
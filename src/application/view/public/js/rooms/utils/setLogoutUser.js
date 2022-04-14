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

        if (responseInJson.error) return { error: responseInJson.error, statusError: response.status }
        if (responseInJson.message && responseInJson.message === 'user token deleted') {
            localStorage.setItem("layerAtual", "LoginLayer")
            location.reload()
        }

    } catch (err) {
        console.log("ERROR", err)
        return { error: err, statusError: 500 }
    }
}
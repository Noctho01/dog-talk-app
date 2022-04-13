export default async (alertBox, roomName) => {
    window.alert('voce selecionou a sala', roomName);
    document.getElementById("container").innerHTML = "<div class='c-loader'></div>";
    
    const urlGet = `http://localhost:3030/api/v1/room/select/${roomName}`;
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

        if (responseInJson.error) body.innerHTML = `<p>${responseInJson.error} <i>Status Code <b>${response.status}</b></i></p>`
        if (responseInJson.message && responseInJson.message === 'room selected') {
            localStorage.setItem("layerAtual", "RoomChatLayer");
            window.location.href = '/'
        }

    } catch (err) {
        body.innerHTML = `<p><b>Server Error:</b> <i>${err}</i></p>`;
    }
}
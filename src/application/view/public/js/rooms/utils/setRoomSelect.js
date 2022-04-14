export default async (alertBox, roomName) => {
    window.alert('voce selecionou a sala', roomName);
    document.getElementById("container").innerHTML = "<div class='c-loader'></div>";
    
    const urlGet = `http://localhost:3030/api/v1/canineprofile`;
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `roomName=${roomName}`
    }

    try {
        const response = await fetch(urlGet, options);
        const responseInJson = await response.json();

        if (responseInJson.error) body.innerHTML = `<p>${responseInJson.error} <i>Status Code <b>${response.status}</b></i></p>`
        if (responseInJson.message && responseInJson.message === 'canine profile created') {
            localStorage.setItem("layerAtual", "RoomChatLayer");
            location.reload()
        }

    } catch (err) {
        body.innerHTML = `<p><b>Server Error:</b> <i>${err}</i></p>`;
    }
}
export default async (alertBox, setRoomSelect) => {
    const roomsList = document.getElementById("rooms_list");

    const urlGet = 'http://localhost:3030/api/v1/rooms';
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
            if (responseInJson.error == "Token expirado" || responseInJson.error == "Não existe token") {
                localStorage.setItem('layerAtual', 'LoginLayer');
                location.reload();
            }
            
            alertBox,innerHTML = `<p>${responseInJson.error} <i>Status Code <b>${response.status}</b></i></p>`

        } else if (responseInJson.rooms) {
            responseInJson.rooms.forEach(room => {
                roomsList.innerHTML += `<li class="roomInList"><b class="roomName">${room.name}</b> (<i class="inRoom">${room.inRoom.length}</i> / <i class="limit">${room.limit}</i>)</li>`;
            });

            const roomInList = document.getElementsByClassName("roomInList");
            const roomName = document.getElementsByClassName("roomName");
            const inRoom = document.getElementsByClassName("inRoom");
            const limit = document.getElementsByClassName("limit");

            for (let i=0; i < roomInList.length; ++i) {
                roomInList[i].addEventListener('click', () => {                    
                    if (parseInt(inRoom[i].outerText) === parseInt(limit[i].outerText)) {
                        return window.alert(`${roomName[i].outerText} está cheia`);
                    }

                    // chamando função responsavel por fazer uma requisição para a API externa e fazer um POST com os dados da sala
                    return setRoomSelect(alertBox, roomName[i].outerText);
                });
            }
        }

    } catch (err) {
        alertBox.innerHTML = `<p><b>Server Error:</b> <i>${err}</i></p>`;
    }
}
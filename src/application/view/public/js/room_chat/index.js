import getCanineProfile from "./utils/getCanineProfile.js";
import Components from "./utils/components.js";
import setLogoutUser from  "./utils/setLogoutUser.js";
import { WsClient } from "./wsclient/WsClient.js";


export default async () => {

    //  EVENTS ------------------------------------------------------------------------------------------------------------------------------
    document.getElementById("button_back").addEventListener('click', () => {
        localStorage.setItem("layerAtual", "RoomsLayer")
        window.location.href = "/"
    })

    document.getElementById("button_logout").addEventListener('click', async () => {
        await setLogoutUser()
    })

    window.onunload = () => {
        localStorage.getItem("layerAtual") === "RoomChatLayer"
        ? localStorage.setItem("layerAtual", "RoomsLayer")
        : null
    }


    // SET COMPONENTS ------------------------------------------------------------------------------------------------------------------------------
    Components.documents = {
        alertBox : document.getElementById("alert_box"),
        clientInfo : document.getElementById("content_info_client"),
        membersInfo : document.getElementById("content_info_members"),
        chatInfo : document.getElementById("content_chat_info"),
        chatScreen : document.getElementById("content_chat_screen"),
        chatInput : document.getElementById("content_chat_input")
    };

    // INIT SETTERS ------------------------------------------------------------------------------------------------------------------------------
    const resultRequest = await getCanineProfile();
    
    if (resultRequest.error) {
        Components.documents.alertBox.innerHTML = Components.alertError(resultRequest.error, resultRequest.statusError);

    } else if (resultRequest.success) {
        const canineProfile = resultRequest.success;
        
        // Inicializando dados staticos
        document.getElementById("img_canine_profile").innerHTML = Components.imgCanineProfileInfo(canineProfile.profilePictureUrl);
        document.getElementById("breed_canine_profile").innerHTML = Components.breedCanineProfileInfo(canineProfile.breed);

        initWebSocketServerCommunication(canineProfile.roomName);

    } else {
        Components.documents.alertBox.innerHTML = Components.alertError("erro de resposta resultRequest");
    }

    function initWebSocketServerCommunication(roomName) {
        const ws = new WsClient(WebSocket, roomName, Components);
        ws.execute();
    }
}
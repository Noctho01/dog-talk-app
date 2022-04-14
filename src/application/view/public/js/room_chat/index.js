import getCanineProfile from "./utils/getCanineProfile.js";
import Components from "./utils/components.js";
import setLogoutUser from  "./utils/setLogoutUser.js";
import { Wsclient } from "./wsclient/Wscliente.js";


export default async () => {
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
        const wsclient = new Wsclient(`ws://localhost:3030/${roomName.toLowerCase()}`, Components);
        wsclient.onmessage = wsclient.message

        //  EVENTS ------------------------------------------------------------------------------------------------------------------------------
        document.getElementById("button_back").addEventListener('click', () => {
            localStorage.setItem("layerAtual", "RoomsLayer")
            location.reload()
        })

        document.getElementById("button_logout").addEventListener('click', async () => {
            await setLogoutUser()
        })

        window.onunload = () => {
            wsclient.close();
            localStorage.getItem("layerAtual") === "RoomChatLayer"
                ? localStorage.setItem("layerAtual", "RoomsLayer")
                : null
            
        }
    }
}
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
        chatInput : document.getElementById("content_chat_input"),
        sender: document.getElementById("sender"),
        buttonSend: document.getElementById("buttonSend")
    };

    // INIT SETTERS ------------------------------------------------------------------------------------------------------------------------------
    const resultRequest = await getCanineProfile();
    
    if (resultRequest.error) {
        Components.documents.alertBox.innerHTML = Components.alertError(resultRequest.error, resultRequest.statusError);
        localStorage.setItem('layerAtual', 'RoomsLayer');
        location.reload()

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
        const wsclient = new Wsclient(`ws://localhost:3030/${roomName.toLowerCase()}`, Components, roomName);
        wsclient.onmessage = wsclient.message

        //  EVENTS ------------------------------------------------------------------------------------------------------------------------------
        document.getElementById("button_back").addEventListener('click', () => {
            wsclient.close();
            localStorage.setItem("layerAtual", "RoomsLayer")
            location.reload()
        })

        document.getElementById("button_logout").addEventListener('click', async () => {
            wsclient.close();
            await setLogoutUser()
        })

        document.getElementById("buttonSend").addEventListener('click', () => {
            if (Components.documents.sender.value != "" || Components.documents.sender.value != " " || Components.documents.sender.value != undefined || Components.documents.sender.value != null) {
                const charQuebraLinha = "<br>";
                const msg = Components.documents.sender.value
                    .replace(/ /g, "&nbsp;")
                    .replace(/\n/g, charQuebraLinha);

                Components.documents.chatScreen.innerHTML += Components.sendMsg(msg);
                Components.documents.sender.value = '';
                Components.documents.sender.select();

                Components.documents.chatScreen.scrollTo(Components.documents.chatScreen.scrollWidth, Components.documents.chatScreen.scrollHeight + 1000);

                wsclient.send(msg);
            }
        });
    }
}
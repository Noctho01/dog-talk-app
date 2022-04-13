import { Layers } from "./Layers.js";
import login from "./login/index.js";
import register from "./register/index.js";
import rooms from "./rooms/index.js";
import roomchat from "./room_chat/index.js";

let layerAtual = localStorage.getItem("layerAtual");
if (!layerAtual) {
    layerAtual = "LoginLayer"
    localStorage.setItem("layerAtual", "LoginLayer")
}

console.log(layerAtual)

switch(layerAtual) {
    case 'RoomChatLayer':
        document.getElementById("container").innerHTML = "<div class='c-loader'></div>";
        setTimeout(() => {
            document.getElementById("head").innerHTML += Layers.RoomChatLayer().head;
            document.getElementById("container").innerHTML = Layers.RoomChatLayer().body;
            roomchat();
        }, 1000);
        break;
    
    case 'LoginLayer':
        document.getElementById("container").innerHTML = "<div class='c-loader'></div>";
        setTimeout(() => {
            document.getElementById("head").innerHTML += Layers.LoginLayer().head;
            document.getElementById("container").innerHTML = Layers.LoginLayer().body;
            login(layerAtual);
        }, 1000);
        break;

    case 'RegisterLayer':
        document.getElementById("container").innerHTML = "<div class='c-loader'></div>";
        setTimeout(() => {
            document.getElementById("head").innerHTML += Layers.RegisterLayer().head;
            document.getElementById("container").innerHTML = Layers.RegisterLayer().body;
            register();
        }, 1000);
        break;

    case 'RoomsLayer':
        document.getElementById("container").innerHTML = "<div class='c-loader'></div>";
        setTimeout(() => {
            document.getElementById("head").innerHTML += Layers.RoomsLayer().head;
            document.getElementById("container").innerHTML = Layers.RoomsLayer().body;
            rooms();
        }, 1000);
        break;

    default:
        document.getElementById("body").innerHTML = "<h1 align='center'>404</h1>";
        break;
}
import getEmail from "./utils/getEmail.js";
import getRooms from "./utils/getRooms.js";
import setRoomSelect from "./utils/setRoomSelect.js";
import setLogoutUser from  "./utils/setLogoutUser.js";

export default () => {
    document.getElementById("button_logout").addEventListener('click', async () => {
        await setLogoutUser()
    })

    const alertBox = document.getElementById("alert_box");
    const body = document.getElementById("body");

    getEmail(body);
    getRooms(alertBox, setRoomSelect);
}
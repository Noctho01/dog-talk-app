export class Layers {

    static RoomChatLayer() {
        return {
            head: `
            <title>Room Chat</title>
            <link rel="stylesheet" href="./css/room_chat/style.css">
            <script src="./js/room_chat/index.js" type="module"></script>
            `,
            body: `
            <div id="content">
                <div id="content_info">
                    <div id="content_info_client">
                        <div id="img_canine_profile">img</div>
                        <div id="breed_canine_profile">breed</div>
                        <button id="button_back">voltar</button>
                        <button id="button_logout">logout</button>
                    </div>
                    <div id="content_info_members">room members</div>
                </div>
                <div id="content_chat">
                    <div id="content_chat_info">room_info</div>
                    <div id="content_chat_screen">chat_screen</div>
                    <div id="content_chat_input">
                        <textarea id="sender" cols="40" rows="5" maxlength="419" wrap="hard"></textarea>
                        <button id="buttonSend">SEND</button>
                    </div>
                </div>
            </div>
            <div id="alert_box"></div>
            `
        }
    }

    static LoginLayer() {
        return {
            head: `<title>Login Usuario</title>`,
            body: `
            <h1>Login Usuario</h1>
            <div id="form">
                <div class="input">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="input">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password">
                </div>
                <div class="input">
                    <button id="buttonLogin">Login</button>
                </div>
                <button id="button_register">register</button>
                <div id="alert_box">
                </div>
            </div>`
        }
    }

    static RegisterLayer() {
        return {
            head: `<title>Registro Usuario</title>`,
            body: `
            <h1>Registro Usuario</h1>
            <div id="form">
                <div class="input">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="input">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password">
                </div>
                <div class="input">
                    <label for="passwordConfirm">Password Confirm:</label>
                    <input type="password" id="passwordConfirm" name="passwordConfirm">
                </div>
                <div class="input">
                    <button id="buttonCreate">Create</button>
                </div>

                <div id="alert_box">
                </div>
            </div>`
        }
    }

    static  RoomsLayer() {
        return {
            head: `<title>Rooms List</title>`,
            body: `
            <header>
                <div id="menu">
                    <b id="seuEmail"></b>
                    <button id="button_logout">logout</button>
                </div>
            </header>
            <h1>Rooms List</h1>
            <div>
                <ul id="rooms_list">
                </ul>
            </div>

            <div id="alert_box">
            </div>`
        }
    }
}
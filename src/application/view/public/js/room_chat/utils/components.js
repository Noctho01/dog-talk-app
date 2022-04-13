export default class Components {

    static documents;


    static alertError(error, statusError) {
        return `<p>Error: ${error} <i>${statusError?"status-code"+statusError:""}</i></p>`;
    }

    // MESSAGE COMPONENST ------------------------------------------------------------------------------------------------------
    
    static membersMsg(img, breed, msg) {
        return `<div class="member_msg">
            <div class="canine_profile_chat_img">${img}</div>
            <div class="canine_profile_chat_breed">${breed}</div>
            <div class="canine_profile_chat_msg">${msg}</div>
        </div>`
    }
    
    static clientMsg(msg) {
        return `<div class-"client_msg">
            <div class="canine_profile_chat_msg">${msg}</div>
        </div>`
    }



    // CONTENT_INFO COMPONENST ------------------------------------------------------------------------------------------------------

    static imgCanineProfileInfo(img) {
        const style = "border-radius: 100px";

        return `<div>
            <img src="${img}" height="150" width="150" style="${style}">
        </div>`
    }

    static breedCanineProfileInfo(breed) {
        return `<div>
            <h1>${breed[0].toUpperCase() + breed.substr(1)}</h1>
        </div>`
    }

    static member(canineProfile) {
        const style = "border_radius: 20px";

        return `<div>
            <img src="${canineProfile.profilePictureUrl}" height="50" width="50" style="${style}">
            <b><i>${canineProfile.breed[0].toUpperCase() + canineProfile.breed.substr(1)}</i></b>
        </div>`
    }
}


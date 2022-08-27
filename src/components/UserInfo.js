export class UserInfo {
    constructor({ nameSelector, professionSelector, avatarSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userProfession = document.querySelector(professionSelector);
        this._userAvatar = document.querySelector(avatarSelector);
    }
  
    getUserInfo() {
        this._user = {
            userName: this._userName.textContent,
            userProfession: this._userProfession.textContent
        }
        return this._user
    }
  
    setUserInfo(name, profession) {
        this._userName.textContent = name;
        this._userProfession.textContent = profession;
    }

    setUserAvatar(link) {
        this._userAvatar.src = link;
    } 
}
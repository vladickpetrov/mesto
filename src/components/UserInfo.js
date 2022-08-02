export class UserInfo {
    constructor({ nameSelector, professionSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userProfession = document.querySelector(professionSelector);
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
}
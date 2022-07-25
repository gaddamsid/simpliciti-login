export class UserInfo {
    //Fields 
    preferred_username: string;
    email_address: string;
    profile: string;
    openid: string;
    
    constructor (preferred_username: string, email_address: string, profile: string, openid: string){
        this.preferred_username = preferred_username;
        this.email_address = email_address;
        this.profile = profile;
        this.openid = openid;
    }
}
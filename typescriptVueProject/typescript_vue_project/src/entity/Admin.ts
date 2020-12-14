import {BaseUser} from './BaseUser'
import {Role} from './Role'

export class Admin extends BaseUser {
    public nip: number = 0;
    public role: Role= Role.ADMIN;
    showInLog(){
        console.log(`Welcome ${this.role} ${this.nama} with NIM of ${this.nip}\n`);
        //console.log("Welcome "+this.role+" "+this.nama+" with NIP of "+this.nip+"\n");
        super.showInLog();
    }
}
import {User} from './User'
import {Role} from './Role'

export abstract class BaseUser implements User{
    public id: number = 0;
    public nama: string = "";
    public abstract role: Role;
    showInLog(){
      console.log(`Full Detail\nRole: ${this.role}\nName: ${this.nama}\nID: ${this.id}`);
      alert("Output is in console log");
    }
}
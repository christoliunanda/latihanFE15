import {BaseUser} from './BaseUser'
import {Role} from './Role'

export class Mahasiswa extends BaseUser{
    public nim: number = 0;
    public role: Role = Role.MAHASISWA
  
    showInLog(){
      console.log(`Welcome ${this.role} ${this.nama} with NIM of ${this.nim}\n`);
      //console.log("Welcome "+this.role+" "+this.nama+"\n"+" with NIM of "+this.nim+"\n");
      super.showInLog();
    }
  }
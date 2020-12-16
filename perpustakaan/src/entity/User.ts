import { Component, Vue } from 'vue-property-decorator';

import Role from "../common/Role";
import BaseEntity from './BaseEntity';


export default class User extends BaseEntity {

    public username: string = "";

    public password: string = "";

    public profileName: string= "";

    public address: string= "";

    public role: Role = Role.ROLE_USER;

    public token: string = "";

    public get isAdmin(){
        return this.role === Role.ROLE_ADMIN;
    }

}

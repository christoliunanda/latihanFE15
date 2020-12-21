import { deserialize, inheritSerialization, serialize } from 'cerialize';
import { Component, Vue } from 'vue-property-decorator';

import Role from "../common/Role";
import BaseEntity from './BaseEntity';

@inheritSerialization(BaseEntity)
export default class User extends BaseEntity {

    @deserialize
    @serialize
    public username: string = "";

    @deserialize
    @serialize
    public password: string = "";

    @deserialize
    @serialize
    public profileName: string= "";

    @deserialize
    @serialize
    public address: string= "";

    @deserialize
    public role: Role = Role.ROLE_USER;

    @deserialize
    public token: string = "";

    public get isAdmin(){
        return this.role === Role.ROLE_ADMIN;
    }

}

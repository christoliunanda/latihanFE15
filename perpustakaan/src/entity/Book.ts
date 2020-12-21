import { deserialize, serialize } from 'cerialize';
import { Component, Vue } from 'vue-property-decorator';

import BaseEntity from './BaseEntity';


export default class Book extends BaseEntity {
    
    @deserialize
    @serialize
    public name: string = "";

    @deserialize
    @serialize
    public description: string = "";

    @deserialize
    @serialize
    public isbn: string = "";

    @deserialize
    @serialize
    public author: string = "";

    @deserialize
    @serialize
    public publisher: string = "";

}

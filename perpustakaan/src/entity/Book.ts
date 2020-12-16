import { Component, Vue } from 'vue-property-decorator';

import BaseEntity from './BaseEntity';


export default class Book extends BaseEntity {

    public name: string = "";

    public description: string = "";

    public isbn: string = "";

    public author: string = "";

    public publisher: string = "";

}

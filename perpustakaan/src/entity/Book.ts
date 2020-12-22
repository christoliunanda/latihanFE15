import { deserialize, deserializeAs, inheritSerialization, serialize, serializeAs } from 'cerialize';

import BaseEntity from './BaseEntity';

@inheritSerialization(BaseEntity)
export default class Book extends BaseEntity {
    
    @deserializeAs("title")
    @serializeAs("title")
    public title: string = "";

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

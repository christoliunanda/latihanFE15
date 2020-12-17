import * as lodash from 'lodash';
import { Serialize } from "cerialize";

export default abstract class BaseEntity{
    public id: number = 0;
    
    public serialize(){
        return Serialize(this);
    }
    
    public clone(){
        return lodash.cloneDeep(this);
    }

    public static InstanceFrom(param: any){

    }

}
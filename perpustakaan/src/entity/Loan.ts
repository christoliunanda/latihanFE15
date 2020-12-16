import { Component, Vue } from 'vue-property-decorator';
import BaseEntity from './BaseEntity';
import Book from './Book';


export default class Loan extends BaseEntity {

    public static STATUS: any = {
        BORROWED: "BORROWED",
        RETURNED: "RETURNED"
    };

    public status: string = "";

    public book : Book = new Book();

    public loanDate: string = new Date().toISOString().split('T')[0];

}

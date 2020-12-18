<template>
    <div class="loan-list p-1 p-md-5">
</template>

<script lang="ts">

    import {Component,Vue} from 'vue-property-decorator';

    import StatusCode from "./../common/StatusCode"

    import User from "./../entity/User"

    import CustomTable from "./CustomTable.vue"
    import Book from "./../entity/Book";
    import Loan from './../entity/Loan';

    @Component({components: {CustomTable}})
    export default class BookList extends Vue{
        
        public baseApi: string = "http://202.152.159.164:8088/perpus/";

        public entity: new () => Loan = Loan;

        public books: Array<Book> = [];

        public rows: number = 0;

        public isBeingRequest: boolean = false;

        public get user(): User{
            return null;
        }

        public doValidate(loan: Loan){
        }

        public onChangeBook(value: string, loan: Loan){
        }

        public onAddorEdit(){

        }

        public doFind(){
            
        }



    }

</script>
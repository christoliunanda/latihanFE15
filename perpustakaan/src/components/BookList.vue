<template>
    
</template>

<script lang="ts">
import Vue from 'vue'
import Book from './../entity/Book';
import User from './../entity/User';
import Session from './../common/Session'

export default class BookList extends Vue {

    public baseApi: string = 'http://202.152.159.164:8088/perpus/books/';

    public entity: new() => Book = Book;

    public get user(): User{
        return Session.get();
    }

    public doValidate(book: Book){
        const keys: Array<keyof Book> = ["name", "description", "isbn", "author", "publisher"];

        return keys.every(prop => book[prop] !== "");
    }
}
</script>
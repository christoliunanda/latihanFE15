<template>
    <div class="pagination-item">
        <component :is="rootTag" :class="rootClass">
            <slot></slot>
            <component v-if="!isBeingRequest && tdatas.length > 0"
                        :is="renderContainerTag" :class="renderContainerClass">
                <template v-for='(data, index) in tdatas'>
                    <slot name="onRenderedData" :data="data" :index="index" :currentPage="currentPage" />
                </template>
            </component>
            <slot v-else-if="$slots['onRequestOrEmptyData']" name="onRequestorEmptyData"/>
        </component>
        <nav aria-label="..." v-if="totalPage > 1" class="float-right">
            <ul class="pagination pagination-sm">
                <li v-if="showPrevious" class="page-item">
                    <a class="page-link" href="#" @click="(e) => onPagination(e, 'previous')">
                        <span aria-hidden="true"></span>
                    </a>
                </li>
                <li v-for="(pagination, index) in paginations" :key="`pagination-${index}`"
                    :class="`${pagination.className} ${pagination.value === '...' ? 'disabled' : ''}`"
                    :style="`cursor: ${pagination.value === '...' ? 'not-allowed' : 'pointer'}`">
                    <a href='#' class='page-link' @click="(e) => onPagination(e,pagination)">
                        {{pagination.value}}
                    </a>
                </li>
                <li v-if="showNext" class="page-item">
                    <a class="page-link" href="#" @click="(e) => onPagination(e,'next')">
                        <span aria-hidden="true">#</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Session from './../common/Session'
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
    
    @Prop({default: 'div'})
    public rootTag: string;

    @Prop({default: ""})
    public rootClass: string;

    @Prop({default: "div"})
    public renderContainerTag: string;

    @Prop({default: ""})
    public renderContainerClass: string;

    @Prop({default: 0})
    public offset: number;

    @Prop({default: 5})
    public limit: number;

    @Prop({default: false})
    public isBeingRequest: boolean;

    @Prop({default: []})
    public datas: Array<any>;

    @Prop({default: 0})
    public rows: number;

    @Prop({default: 5})
    public maxLengthPagination: number;

    @Watch("offset")
    public onOffsetChange(value: number = 0){
        this.currentPage = value === 0 ? 1 : this.currentPage; 
    }

    public totalPage: number = 0;

    public currentPage: number = 1;

    public get tdatas(){
        this.totalPage = Math.ceil(parseInt((this.rows || this.datas.length) as any) / parseInt(this.limit as any));
        
        return this.datas;
    }

    public get paginations(){
        const page: number = parseInt(this.currentPage as any);
        const totalPage: number = parseInt(this.totalPage as any);

        const sideWidth: number = this.maxLengthPagination < 9 ? 1 : 2;
        const leftWidth: number = (this.maxLengthPagination - sideWidth * 2 - 3) >> 1;
        const rightWidth: number = (this.maxLengthPagination - sideWidth * 2 - 3) >> 1;

        const defaultRange: any = {value: "...", className: "page-item"};
        const range: Function = (start: any, end: any) => Array.from(Array(end - start + 1), (_, i)=>{
            return{
                value: i + start,
                className: parseInt(page as any) === parseInt((i + start) as any) ? "page-item active" : "page-item"
            };
        });

        if (totalPage <= this.maxLengthPagination){
            return range(1, totalPage);
        }

        if (page <= this.maxLengthPagination - sideWidth - 1 - rightWidth){
            return range(1, this.maxLengthPagination - sideWidth - 1)
                .concat(defaultRange)
                .concat(range(totalPage - sideWidth - 1 - rightWidth - leftWidth, totalPage));
        }

        if (page >= totalPage - sideWidth - 1 - rightWidth){
            return range(1, this.maxLengthPagination - sideWidth - 1)
                .concat(defaultRange)
                .concat(range(totalPage - sideWidth - 1 - rightWidth - leftWidth, totalPage));
        }

        return range(1, sideWidth)
            .concat(defaultRange)
            .concat(range(page - leftWidth, page + rightWidth))
            .concat(defaultRange)
            .concat(range(totalPage - sideWidth + 1, totalPage));
    }

    public get showPrevious(){
        return parseInt(this.currentPage as any) > 1 && this.paginations.length > 0
    }

    public get showNext(){
        return parseInt(this.currentPage as any) < parseInt(this.totalPage as any) && this.paginations.length > 0;
    }

    public onPagination(e: any, pagination: any){
        e.preventDefault();

        if (pagination === "previous" || pagination === "next"){
            pagination = this.paginations.find((value:any) =>{
                return parseInt(value.value as any) ===
                    ((pagination === "previous") ? (parseInt(this.currentPage as any) - 1) : (parseInt(this.currentPage as any) + 1));        
            }) || {value: ((pagination === 'previous') ? (parseInt(this.currentPage as any) - 1) : (parseInt(this.currentPage as any)+ 1))};
        }

        if (!pagination || pagination.value === "..."){
            return;
        }

        if(parseInt(this.currentPage as any) !== parseInt(pagination.value as any)) {
            const oldCurrentPage: number = parseInt(this.currentPage as any);

            this.currentPage = parseInt(pagination.value as any);

            this.$emit('onPagination', (parseInt(pagination.value as any) - 1) * parseInt(this.limit as any), () =>{
                this.currentPage = oldCurrentPage;
            });
        }
    }
 
}
</script>
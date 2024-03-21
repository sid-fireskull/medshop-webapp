import { Information } from "./information";

export class InsertionSummary{
    totalRecord?:number;
	totalInsertedRecord?:number;
	totalUpdatedRecord?:number;

    constructor(totalRecord:number, totalInsertedRecord:number, totalUpdatedRecord:number){
        this.totalRecord = totalRecord ?? 0;
        this.totalInsertedRecord= totalInsertedRecord ?? 0;
        this.totalUpdatedRecord= totalUpdatedRecord ?? 0;
    }
}
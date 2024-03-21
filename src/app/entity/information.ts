import { Status } from "./status";

export class Information implements Status{
    hasError: boolean;
    message: string;
    data: any;

    constructor(hasError: boolean, message: string, data: any) {
        this.hasError = hasError ?? false;
        this.message = message ?? "";
        this.data = data;
    }
}
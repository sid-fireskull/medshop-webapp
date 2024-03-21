import { Status } from "./status";

export class CustomException implements Status{
    message: string;
	details: string;
	timestamp: Date;

    constructor(res: any) {
        this.message = res["message"] ?? false;
        this.details = res["details"] ?? "";
        this.timestamp = res["timestamp"];
    }

}
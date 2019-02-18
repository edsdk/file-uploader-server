import {Message} from "lib/action/resp/Message";

export class FileData {

    "isCommited": boolean;
    "name": string;
    "dir": string;
    "bytes": number;
    "isImage": boolean;
    "width": number;
    "height": number;
    "errors": Message[];
    "sizes": {[key: string]: FileData};

}
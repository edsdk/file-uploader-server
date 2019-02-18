import {RespOk} from "lib/action/resp/RespOk";
import {FileData} from "lib/action/resp/FileData";

export class RespUploadAddFile extends RespOk {

    public "file": FileData;

}

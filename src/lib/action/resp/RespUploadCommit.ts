import {RespOk} from "lib/action/resp/RespOk";
import {FileData} from "lib/action/resp/FileData";

export class RespUploadCommit extends RespOk {

    public "files": FileData[];

}

import {AActionUploadId} from "lib/action/AActionUploadId";
import {RespOk} from "lib/action/resp/RespOk";
import {Req} from "lib/action/req/Req";
import {ReqUploadRemoveFile} from "lib/action/req/ReqUploadRemoveFile";
import {MessageException} from "lib/MessageException";
import {Message} from "lib/action/resp/Message";
import {ReqError} from "lib/action/req/ReqError";
import {RespFail} from "lib/action/resp/RespFail";
import {FileUploaded} from "lib/file/FileUploaded";

export class ActionUploadRemoveFile extends AActionUploadId {

    public getName(): string {
        return "uploadRemoveFile";
    }

    public run(request: Req): Promise<RespOk> {
        return new Promise<RespOk>(
            (resolve, reject) => {
                let req: ReqUploadRemoveFile = request as ReqUploadRemoveFile;
                this.validateUploadId(req);
                let file: FileUploaded = new FileUploaded(this.m_config, req["uploadId"], req["name"], req["name"]);
                file.checkForErrors(true);

                if (file.getErrors().length > 0) {
                    reject(new MessageException(Message.createMessageByFile(Message.UNABLE_TO_DELETE_UPLOAD_DIR, file.getData())))
                    return;
                }

                file.delete();
                resolve(new RespOk());
            }
        );
    }

}

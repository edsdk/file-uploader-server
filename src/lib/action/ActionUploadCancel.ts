import {AActionUploadId} from "lib/action/AActionUploadId";
import {ReqUploadId} from "lib/action/req/ReqUploadId";
import {RespOk} from "lib/action/resp/RespOk";
import {Req} from "lib/action/req/Req";
import * as fsx from "fs-extra"
import {MessageException} from "lib/MessageException";
import {Message} from "lib/action/resp/Message";

export class ActionUploadCancel extends AActionUploadId {

    public getName(): string {
        return "uploadCancel";
    }

    public run(request: Req, onFinish: (result: RespOk) => void): void {
        let req: ReqUploadId = request as ReqUploadId;
        this.validateUploadId(req);
        if (!this.m_config.doKeepUploads()) {
            try {
                fsx.removeSync(this.m_config.getTmpDir() + "/" + req["uploadId"]);
            } catch (e) { // IOException
                console.log(e);
                throw new MessageException(Message.createMessage(Message.UNABLE_TO_DELETE_UPLOAD_DIR));
            }
        }
        onFinish(new RespOk());
    }

}

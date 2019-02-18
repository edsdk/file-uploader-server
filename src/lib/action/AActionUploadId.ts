import {AAction} from "lib/action/AAction";
import {ReqUploadId} from "lib/action/req/ReqUploadId";
import {MessageException} from "lib/MessageException";
import {Message} from "lib/action/resp/Message";
import * as fsx from "fs-extra"

export abstract class AActionUploadId extends AAction {

    protected validateUploadId(req: ReqUploadId) {
        if (req["uploadId"] == null)
            throw new MessageException(Message.createMessage(Message.UPLOAD_ID_NOT_SET));

        let dir = this.m_config.getTmpDir() + "/" + req["uploadId"];

        if (!fsx.existsSync(dir) || !fsx.lstatSync(dir).isDirectory())
            throw new MessageException(Message.createMessage(Message.UPLOAD_ID_INCORRECT));
    }

}

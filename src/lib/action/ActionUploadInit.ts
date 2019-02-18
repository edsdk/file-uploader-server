import {AAction} from "lib/action/AAction";
import {Req} from "lib/action/req/Req";
import {RespOk} from "lib/action/resp/RespOk";
import * as fsx from "fs-extra"
import {MessageException} from "lib/MessageException";
import {Message} from "lib/action/resp/Message";
import {RespUploadInit} from "lib/action/resp/RespUploadInit";

export class ActionUploadInit extends AAction {

    public getName(): string {
        return "uploadInit";
    }

    public run(request: Req, onFinish: (result: RespOk) => void): void {
        let alphabeth = "abcdefghijklmnopqrstuvwxyz0123456789";
        let dir: string;
        let id: string;
        do {
            id = "";
            for (let i=0; i<6; i++) {
                let charNumber: number = Math.floor(Math.random()*alphabeth.length);
                id += alphabeth.substring(charNumber, charNumber + 1);
            }
            dir = this.m_config.getTmpDir() + "/" + id;
        } while (fsx.existsSync(dir) && fsx.lstatSync(dir).isDirectory());

        try {
            fsx.mkdirsSync(dir);
        } catch (e) {
            console.log(e);
            throw new MessageException(Message.createMessage(Message.UNABLE_TO_CREATE_UPLOAD_DIR));
        }

        onFinish(new RespUploadInit(id, this.m_config));
    }

}

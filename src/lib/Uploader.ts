import {Actions} from "./Actions";
import {IConfig} from "./config/IConfig";
import {MessageException} from "./MessageException";
import {Req} from "lib/action/req/Req";
import {RespOk} from "lib/action/resp/RespOk";
import {createReqError, ReqError} from "lib/action/req/ReqError";
import {Message} from "lib/action/resp/Message";
import {RespFail} from "lib/action/resp/RespFail";
import {AAction} from "lib/action/AAction";

export class Uploader {

    protected m_actions: Actions;
    protected m_config: IConfig;

    constructor(config: IConfig, actions: Actions) {
        this.m_config = config;
        this.m_actions = actions;
    }

    public run(req: Req, onFinish: (resp: RespOk) => void) {
        let resp: RespOk = null;
        try {
            let action: AAction = this.m_actions.getAction(req["action"]);
            if (action == null) {
                action = this.m_actions.getActionError();
                req = createReqError(Message.createMessage(Message.ACTION_NOT_FOUND));
            }
            action.setConfig(this.m_config);
            let resp: RespOk = null;

            action.runWithCallback(
                req,
                (actionResult: RespOk|Error) => {
                    let resp: RespOk = null;
                    if (actionResult instanceof MessageException) {
                        resp = new RespFail((actionResult as MessageException).getFailMessage());
                    } else if (actionResult instanceof Error) {
                        resp = new RespFail(Message.createMessage(Message.INTERNAL_ERROR));
                    } else {
                        resp = actionResult as RespOk;
                    }
                    onFinish(resp);
                }
            );
        } catch (e) {
            console.log(e);
            resp = new RespFail(Message.createMessage(Message.INTERNAL_ERROR));
            onFinish(resp);
        }
    }

}

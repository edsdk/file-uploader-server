import {AAction} from "lib/action/AAction";
import {Req} from "lib/action/req/Req";
import {ReqError} from "lib/action/req/ReqError";
import {RespOk} from "lib/action/resp/RespOk";
import {RespFail} from "lib/action/resp/RespFail";

export class ActionError extends AAction {

    public getName(): string {
        return "error";
    }

    public run(request: Req, onFinish: (result: RespOk) => void): void {
        let reqError: ReqError = request as ReqError;
        onFinish(new RespFail(reqError["message"]));
    }

}

import {IConfig} from "lib/config/IConfig";
import {Req} from "lib/action/req/Req";
import {RespOk} from "lib/action/resp/RespOk";

export abstract class AAction {

    protected m_config: IConfig;

    public setConfig(config: IConfig) { this.m_config = config; }

    public abstract getName(): string;

    public runWithCallback(request: Req, onFinish: (result: RespOk|Error) => void): void {
        try {
            this.run(request, onFinish);
        } catch (e) {
            console.log(e);
            onFinish(e);
        }
    }

    public abstract run(request: Req, onFinish: (result: RespOk) => void): void;

    protected validateBoolean(b: boolean, defaultValue: boolean): boolean { return b == null ? defaultValue : b; }
    protected validateInteger(i: number, defaultValue: number): number { return i == null ? defaultValue : i; }
    protected validateString(s: string, defaultValue: string): string { return s == null ? defaultValue : s; }

}

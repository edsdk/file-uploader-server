import {AAction} from "lib/action/AAction";
import {ActionError} from "lib/action/ActionError";
import {ActionUploadInit} from "lib/action/ActionUploadInit";
import {ActionUploadRemoveFile} from "lib/action/ActionUploadRemoveFile";
import {ActionUploadAddFile} from "lib/action/ActionUploadAddFile";
import {ActionUploadCommit} from "lib/action/ActionUploadCommit";
import {ActionUploadCancel} from "lib/action/ActionUploadCancel";

export class Actions {

    protected m_actions: AAction[] = [];

    constructor() {
        this.m_actions.push(new ActionError());

        this.m_actions.push(new ActionUploadInit());
        this.m_actions.push(new ActionUploadAddFile());
        this.m_actions.push(new ActionUploadRemoveFile());
        this.m_actions.push(new ActionUploadCommit());
        this.m_actions.push(new ActionUploadCancel());
    }

    public getActionError(): AAction {
        return this.getAction("error");
    }

    public getAction(name: string): AAction {
        for (let i=0; i<this.m_actions.length; i++)
            if (this.m_actions[i].getName() === name)
                return this.m_actions[i];
        return null;
    }

}

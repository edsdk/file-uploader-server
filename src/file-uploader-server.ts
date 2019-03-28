import * as express from "express";
import * as Busboy from "busboy";
import {UploaderServlet} from "servlet/UploaderServlet";

class ExpressFileUploader {

    protected servlet: UploaderServlet;

    constructor(
        protected app: express.Express,
        protected url: string,
        protected config: {[key: string]: string}
    ) {
        this.servlet = new UploaderServlet(config);
        app.post(url, (request: express.Request, response: express.Response) => {
            this.upload(request, response);
        });
        app.options(url, (request: express.Request, response: express.Response) => {
            this.uploadOptions(request, response);
        });
    }

    private upload(request: express.Request, response: express.Response): void {
        let busboy = new Busboy({ "headers": request.headers });
        busboy.on('file', function(fieldname: string, file: any, filename: string, encoding: string, mimetype: string) {
            if (fieldname === "file") {
                (request as any)["postFile"] = {
                    "filename": filename,
                    "data": null
                };
                file.on('data', function (data: Buffer) {
                    let oldData: Buffer = (request as any)["postFile"]["data"];
                    let newData = oldData == null ? data : Buffer.concat([oldData, data]);
                    (request as any)["postFile"]["data"] = newData;
                });
            }
        });
        busboy.on('field', (fieldname: string, val: any, fieldnameTruncated: string, valTruncated: any, encoding: string, mimetype: string) => {
            if (fieldname === "data")
                (request as any).postData = val;
        });
        busboy.on('finish', () => {
            this.servlet.doPost(request, response);
        });
        request.pipe(busboy);
    }

    private uploadOptions(request: express.Request, response: express.Response) {
        this.servlet.doOptions(request, response);
        response.sendStatus(200);
    }

}

export function bindFileUploader(config: {
    app: express.Express,
    url: string,
    dir: string,
    config?: {[key: string]: string}
}) {
    if (!config.config)
        config.config = {};
    config.config['dirFiles'] = config.dir;
    new ExpressFileUploader(config.app, config.url, config.config);
}

export interface FileUploaderMicroserviceConfig {
    host?: string,        // host to listen
    port?: number,        // port to listen
    urlUploader?: string, // path only
    dirRoot?: string,     // dir to serve static content from
    dirFiles: string,     // dir of directory with files to upload into,
    config?: {[key: string]: string} // config to pass into file-uploader-server
}

export function startFileUploaderMicroservice(config: FileUploaderMicroserviceConfig): express.Express {

    // Create Express app
    let app = express();

    // Attach uploader
    bindFileUploader({
        app: app,                                           // Application to attach to
        url: config.urlUploader ? config.urlUploader : '/', // URL to serve
        dir: config.dirFiles                                // Where to store files
    });

    if (config.dirRoot)
        app.use(express.static(config.dirRoot)); // Serve HTML and CSS files from 'www' directory

    // Listen the 8080-th port on localhost
    app.listen(
        config.port ? config.port : 8080,
        config.host ? config.host : 'localhost',
        () => {
            // Server started successfully
            console.log("File Uploader microservice started on " + config.host + ":" + config.port);
        }
    );

    return app;
}
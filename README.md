# File Uploader

> Module for [Express](https://www.npmjs.com/package/express) for handling file uploads

Attach File Uploader to your Express application and it will serve file uploads on specified URL.

Being tiny File Uploader has many useful features like transaction upload with no DB, supports changing URL and destination directory for files.

Currently this package has no documented API due to it supposed to use together with [ImgPen](https://imgpen.com) image editor only, but in future we will provide fine API reference for building your own applications with this uploader.


## Install

With [npm](https://npmjs.com/) installed, run

```
$ npm install @edsdk/file-uploader-server
```


## Usage

### Using inside your own Express server

Bind required URL in your application in this way:

```js
var FileUploaderServer = require('@edsdk/file-uploader-server');

FileUploaderServer.bindFileUploader({
    app: app,             // your Express application
    url: '/uploader',     // URL to handle
    dir: '/var/www/files' // where to store uploaded files
});
```

If you want to allow access to uploaded files (usually you do) then write something lile:

```js
app.use(express.static('/var/www/files'));
```

Please also see [example of usage](https://github.com/edsdk/imgpen-example) File Uploader with ImgPen for editing and uploading images.


### Running as microservice instance

If you do not have your own Express server, you can run File Uploader as microservice.
This means it will create new Express instance, do all required bindings and start to listen incoming requests.

```js
require("@edsdk/file-uploader-server").startFileUploaderMicroservice({
    host: 'localhost',
    port: 8080,
    urlUploader: '/uploader',
    dirRoot: './www',
    dirFiles: './www/images'
});
```

The code above will:

- Listen `http://localhost/8080/uploader` and wait for files uploaded by file uploader compatible clients (like [ImgPen](https://npmjs.com/package/@edsdk/imgpen)).
- Save uploaded files to `./www/images` directory
- Serve `./www` directory as public in order to allow accessing uploaded files by there URLs.

If you do not wish to share uploaded files with File Uploader microservice you can set `dirRoot: null`. This can be useful if you handle uploads with File Uploader but want to share them using another webserver which has access to the same storage.

See [sample of usage](https://github.com/edsdk/imgpen-example) of File Uploader microservice together with [ImgPen](https://imgpen.com) image editor.


## Server languages support

Current package is targeted to serve uploads inside Express server in Node environment.

If you need another backend support, please purchase [ImgPen](https://imgpen.com).
Currently there are available server side modules for:

- Node (TypeScript/JavaScript)
- PHP
- Java



## See Also

- [ImgPen website](https://imgpen.com)
- [ImgPen package](https://npmjs.org/package/@edsdk/imgpen)
- [File Uploader server and ImgPen example](https://npmjs.org/package/@edsdk/imgpen-example)
- [ImgPen + File Uploader example](https://github.com/edsdk/imgpen-example)


## License

Double licensing with EdSDK licenses family. Free usage is available.
File Uploader now comes in bundle with ImgPen image editor and uses the same license you choose for [ImgPen](https://npmjs.com/package/@edsdk/imgpen).



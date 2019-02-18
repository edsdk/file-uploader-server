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

If you do not want to configure Express service and just want to have uploader instance, please use [File Uploader microservice](https://npmjs.com/package/@edsdk/file-uploader-microservice).

Please also see [example of usage](https://github.com/edsdk/imgpen-example) File Uploader with ImgPen for editing and uploading images.


## Server languages support

Current package is targeted to serve uploads inside Express server in Node environment.

If you need another backend support, please purchase [ImgPen](https://imgpen.com).
Currently there are available server side modules for:

- Node (TypeScript/JavaScript)
- PHP
- Java
- ASP.NET


## License

Double licensing with EdSDK licenses family. Free usage is available.
File Uploader now comes in bundle with ImgPen image editor and uses the same license you choose for [ImgPen](https://npmjs.com/package/@edsdk/imgpen).



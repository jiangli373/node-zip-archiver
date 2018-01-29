### node-zip-archiver

fork项目 https://github.com/archiverjs/node-archiver.git

在其基础上只保留了zip stream

修复了把远程服务器上文件打包到zip中的问题

原来的项目对于远程服务器的文件有一个问题

    archive.append(request(downLoadUrl1), {name:  'download.dmg'});

    archive.append(request(downLoadUrl2), {name:  'download.dmg'});

    archive.append(request(downLoadUrl3), {name:  'download.dmg'});

如果需要请求远程服务器上的3个文件，需要这样子处理，；会产生一个问题，request是立即执行的，原来的库一次只能执行一个处理，对于其它的需要等待上一个处理完成以后才会执行，所以如果文件比较大的话，后面的请求会出现timeout的问题。

所以在它的基础上修改了对于远程文件的请求方式

可以参考example目录下的zip-pack.js

修改后的方式

    archive.append(downLoadUrl, {name: 'download.dmg', isUrl: true});

这样只有当处理到当前url的时候，才会去请求数据

注意这里需要添加一个`isUrl: true`的属性

其它的API保持不变  

可参考：  https://archiverjs.com/docs/  


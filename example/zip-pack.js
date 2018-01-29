'use strict';

const request = require('request');
var archiver = require('../index');
var archive = archiver('zip');
const fs = require('fs');
const path = require('path');

const resultArr = [
  {
    fileName: 'TimLine.zip',
    downLoadUrl: 'http://p2oryw9jc.bkt.clouddn.com/googlechrome_mac_59.0.3071.109.dmg'
  }
];
let output = fs.createWriteStream(__dirname + '/example.zip');

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function () {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});
archive.on('progress', function (progress) {
  console.log(progress);
});
// good practice to catch this error explicitly
archive.on('error', function (err) {
  throw err;
});
resultArr.map(item => {
  archive.append(item.downLoadUrl, {name:  `rtet/ppppp/${item.fileName}`, isUrl: true});
})
archive.append('测试可以打包成功吗', {name:  `readme.md`, isUrl: false});

archive.pipe(output);
archive.finalize();
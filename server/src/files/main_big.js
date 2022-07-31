/**
 * 服务入口
 */
 var http = require('http');
 var koaStatic = require('koa-static');
 var path = require('path');
 var koaBody = require('koa-body');//文件保存库
 var fs = require('fs');
 var Koa = require('koa2');
 
 var app = new Koa();
 var port = process.env.PORT || '8100';
 
 var uploadHost= `http://localhost:${port}/uploads/`;
 
 app.use(koaBody({
  formidable: {
      //设置文件的默认保存目录，不设置则保存在系统临时目录下  os
      uploadDir: path.resolve(__dirname, '../static/uploads')
  },
  multipart: true // 开启文件上传，默认是关闭
}));

//开启静态文件访问
app.use(koaStatic(
  path.resolve(__dirname, '../static') 
));

//二次处理文件，修改名称
app.use((ctx) => {
  var body = ctx.request.body;
  var files = ctx.request.files ? ctx.request.files.f1:[];//得到上传文件的数组
  var result=[];
  
  var fileToken = ctx.request.body.token;// 文件标识
  var fileIndex=ctx.request.body.index;//文件顺序

  if(files &&  !Array.isArray(files)){//单文件上传容错
      files=[files];
  }

  files && files.forEach(item=>{
      var path = item.path;
      var fname = item.name;//原文件名称
      var nextPath = path.slice(0, path.lastIndexOf('/') + 1) + fileIndex + '-' + fileToken;
      if (item.size > 0 && path) {
          //得到扩展名
          var extArr = fname.split('.');
          var ext = extArr[extArr.length - 1];
          //var nextPath = path + '.' + ext;
          //重命名文件
          fs.renameSync(path, nextPath);
          result.push(uploadHost+nextPath.slice(nextPath.lastIndexOf('/') + 1));
      }
  });

  if(body.type==='merge'){//合并分片文件
      var filename = body.filename,
      chunkCount = body.chunkCount,
          folder = path.resolve(__dirname, '../static/uploads')+'/';
      
      var writeStream = fs.createWriteStream(`${folder}${filename}`);

      var cindex=0;
      //合并文件
      function fnMergeFile(){
          var fname = `${folder}${cindex}-${fileToken}`;
          var readStream = fs.createReadStream(fname);
          readStream.pipe(writeStream, { end: false });
          readStream.on("end", function () {
              fs.unlink(fname, function (err) {
                  if (err) {
                      throw err;
                  }
              });
              if (cindex+1 < chunkCount){
                  cindex += 1;
                  fnMergeFile();
              }
          });
      }
      fnMergeFile();
      ctx.body='merge ok 200';
  }
});

/**
 * http server
 */
 var server = http.createServer(app.callback());
 server.listen(port);
 console.log(`demo1 server start ......portat${port} `);

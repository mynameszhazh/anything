const path = require("path");
const http = require("http");
const fse = require("fs-extra");
const multiparty = require("multiparty");
const server = http.createServer();

// 大文件存储目录
const UPLOAD_DIR = path.resolve(__dirname, "..", "static/chunkDir");

const resolvePost = req =>
  new Promise(resolve => {
    let chunk = "";
    req.on("data", data => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });

// 返回所有的我已经上传的视频 
const createUploadedList = async fileHash =>
  fse.existsSync(path.resolve(UPLOAD_DIR, fileHash))
    ? await fse.readdir(path.resolve(UPLOAD_DIR, fileHash))
    : [];


// 提取后缀名
const extractExt = filename => {
  return filename.slice(filename.lastIndexOf("."), filename.length);
}

// 写入文件流
const pipeStream = (path, writeStream) =>
  new Promise(resolve => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });

// 合并切片
const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, 'chunkDir' + filename);
  const chunkPaths = await fse.readdir(chunkDir);
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  // 并发写入文件
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 根据 size 在指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
        })
      )
    )
  );
  console.log(chunkDir)
  // 合并后删除保存切片的目录
  fse.rmdirSync(chunkDir);
};
server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }
  const multipart = new multiparty.Form();

  multipart.parse(req, async (err, fields, files) => {
    if (err) {
      return;
    }
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    // 创建临时文件夹用于临时存储 chunk
    // 添加 chunkDir 前缀与文件名做区分
    const chunkDir = path.resolve(UPLOAD_DIR, 'chunkDir' + filename);

    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir);
    }

    // fs-extra 的 rename 方法 windows 平台会有权限问题
    // @see https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
    await fse.move(chunk.path, `${chunkDir}/${hash}`);
    res.end("received file chunk");
  });
  if (req.url === "/merge") {
    const data = await resolvePost(req);
    const { filename, hashName, size } = data;
    const ext = extractExt(filename);
    const filePath = path.resolve(UPLOAD_DIR, `${hashName}${ext}`);
    await mergeFileChunk(filePath, hashName, size);
    res.end(
      JSON.stringify({
        code: 0,
        message: "file merged success"
      })
    );
  }
  if (req.url === "/verify") {
    const data = await resolvePost(req);
    const { fileHash, filename } = data;
    // const ext = extractExt(filename);
    // const filePath = path.resolve(UPLOAD_DIR, `${filename}${ext}`);
    const filePath = path.resolve(UPLOAD_DIR, `${fileHash}`);
    console.log(filePath, fse.existsSync(filePath))
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false,
          uploadedList: await createUploadedList(fileHash)
        })
      );
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true
        })
      );
    }
  }
});


server.listen(3000, () => console.log("listening port 3000"));

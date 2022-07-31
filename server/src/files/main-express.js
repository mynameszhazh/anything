const express = require('express')
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')
const { Buffer } = require('buffer')
// 上传文件最终路径
const STATIC_FILES = path.join(__dirname, '../static/files')
// 上传文件临时路径
const STATIC_TEMPORARY = path.join(__dirname, '../static/temporary')
const server = express()
// 静态文件托管
server.use(express.static(path.join(__dirname, '../dist')))
server.all("*", function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method == 'OPTIONS')
		res.sendStatus(200); //让options尝试请求快速结束
	else
		next();
});
// 切片上传的接口
server.post('/upload', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        let filename = fields.filename[0]
        let hash = fields.hash[0]
        let chunk = files.chunk[0]
        let dir = `${STATIC_TEMPORARY}/${filename}`
        // console.log(filename, hash, chunk)
        try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)
            const buffer = fs.readFileSync(chunk.path)
            const ws = fs.createWriteStream(`${dir}/${hash}`)
            ws.write(buffer)
            ws.close()
            res.send(`${filename}-${hash} 切片上传成功`)
        } catch (error) {
            console.error(error)
            res.status(500).send(`${filename}-${hash} 切片上传失败`)
        }
    })
})
//合并切片接口
server.get('/merge', async (req, res) => {
    // ctx.set('Access-Control-Allow-Origin','*')
    // ctx.set('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
    // ctx.set('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
    const { filename } = req.query
    try {
        let len = 0
        const bufferList = fs.readdirSync(`${STATIC_TEMPORARY}/${filename}`).map((hash,index) => {
            // 通过一个索引解决这样的问题
            const buffer = fs.readFileSync(`${STATIC_TEMPORARY}/${filename}/${index}`)
            len += buffer.length
            return buffer
        });
        //合并文件
        const buffer = Buffer.concat(bufferList, len);
        const ws = fs.createWriteStream(`${STATIC_FILES}/${filename}`)
        ws.write(buffer);
        ws.close();
        res.send(`切片合并完成`);
    } catch (error) {
        console.error(error);
    }
})

server.listen(3000, _ => {
    console.log('http://localhost:3000/')
})
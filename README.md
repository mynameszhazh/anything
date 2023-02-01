# give me

## main(vue 相关)

- 一个简单的 vue 项目
  - `npm i`
  - `npm run serve`

## brower

- [brower](./browser/readme.md)
  - 库
  - 插件

## server

### turnserver 服务搭建

- `sodu nohup turnserver -L 0.0.0.0 -a -u admin:123456 -v -f -r nort.gov &`

  - 如果不加 nohup 就是一个前台执行,如果端口关闭了服务就会关闭

- `sudo lsof -i:3478`
  - 检查 后端 turn 服务有没有打开

### nginx 代理

- [环境安装](https://blog.csdn.net/yucaifu1989/article/details/125408091)
  - centos linux 环境
- [环境配置基本模板](./lib/conf.conf)
  - 注意里面存在一些服务器 跨域的操作
    - `proxy_pass` 的一些基本操作

## extra

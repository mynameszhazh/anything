# Docker

## 初始 Docker

### 什么是 docker

- 一种可以运行在操作系统底层的(跨系统)
- 每个依赖单独打包隔离
- Docker 和虚拟机的区别
  - 占用内存更小
  - 速度更快

### 镜像(image)和容器(container)

- image
  - 可以运行某种环境(mysql) 的全部运行文件, 进行打包后的产物
- container
  - 镜像中运行的实例就是 容器 会进行隔离

### DockerHub

- 类似一种 github, 不过里面管理的是 docker 的镜像

### Docker 架构

> cs 架构

- 服务端
  - Docker 守护进程, 负责处理 Docker 指令, 管理镜像, 容器等
- 客户端
  - 通过命令或者 RestApi 想 Docker 服务端发送指令. 可以在本地或远程向服务端发送指令.

### Docker 的 安装

- Mac 电脑安装可不要太简单了
- centos yum 使用不了 我也不知道怎么回事

## Docker 的基本操作

### 创建一个新容器

> docker run --name containerName -p 80:80 -d nginx

- docker run : 创建并运行一个容器
- --name: 给容器取名
- -p : 端口映射, 冒号左侧是宿主机端口, 右侧是容器端口
- -d : 后台运行
- nginx : 相关镜像

### 往 nginx 容器 中添加内容

> docker exec -it xjh bash

- 容器内部有一个单独的文件系统

> docker rm xjh

### 使用 redis

> docker run --name mr -p 6379:6379 -d redis redis-server --save 60 1 --loglevel warning

- 运行 docker
  > docker exec -it mr bash
  > redis-cli

## DockerFile 自定义镜像

## Docker-Compose

## Docker 镜像服务

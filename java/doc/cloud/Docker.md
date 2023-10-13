# Docker

## 初始 Docker
### 什么是docker
  - 一种可以运行在操作系统底层的(跨系统)
  - 每个依赖单独打包隔离
- Docker和虚拟机的区别 
  - 占用内存更小
  - 速度更快

### 镜像(image)和容器(container)
  - image
    - 可以运行某种环境(mysql) 的全部运行文件, 进行打包后的产物
  - container
    - 镜像中运行的实例就是 容器 会进行隔离

### DockerHub
  - 类似一种github, 不过里面管理的是 docker 的镜像 

### Docker架构
> cs架构
- 服务端
  - Docker守护进程, 负责处理Docker指令, 管理镜像, 容器等
- 客户端
  - 通过命令或者RestApi想Docker服务端发送指令. 可以在本地或远程向服务端发送指令.

### Docker 的 安装

## Docker 的基本操作

## DockerFile 自定义镜像

## Docker-Compose

## Docker 镜像服务

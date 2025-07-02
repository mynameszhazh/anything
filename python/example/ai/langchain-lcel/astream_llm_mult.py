from langchain_openai import ChatOpenAI
import asyncio


async def task1():
    gpt4 = ChatOpenAI(model="deepseek-chat", 
        openai_api_key="sk-ef4899dc2dda4b039b718df4c4014bcb", 
        base_url="https://api.deepseek.com/v1", 
        temperature=0.7)
    # 第一个任务的逻辑代码
    chunks = []
    async for chunk in gpt4.astream("天空是什么颜色？"):
        chunks.append(chunk)
        # 判断chunks长度为1的时候，打印chunks[0]
        if len(chunks) == 2:
            print(chunks[1])
        print(chunk.content, end="|", flush=True)


async def task2():
    gpt4o = ChatOpenAI(model="deepseek-chat", 
        openai_api_key="sk-ef4899dc2dda4b039b718df4c4014bcb", 
        base_url="https://api.deepseek.com/v1", 
        temperature=0.7)
    # 第二个任务的逻辑代码
    chunks = []
    async for chunk in gpt4o.astream("讲个笑话？"):
        chunks.append(chunk)
        # 判断chunks长度为1的时候，打印chunks[0]
        if len(chunks) == 2:
            print(chunks[1])
        print(chunk.content, end="|", flush=True)


async def main():
    #同步调用
    await task1()
    await task2()
    #异步调用：并发运行两个任务
    # await asyncio.gather(task1(), task2())


# 运行主函数
asyncio.run(main())

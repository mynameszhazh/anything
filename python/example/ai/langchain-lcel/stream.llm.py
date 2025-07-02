from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="deepseek-chat", 
    openai_api_key="sk-ef4899dc2dda4b039b718df4c4014bcb", 
    base_url="https://api.deepseek.com/v1", 
    temperature=0.7)

model = llm | StrOutputParser()

for chunk in model.stream("天空是什么颜色"):
    print(chunk, end="", flush=True)

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

prompt = ChatPromptTemplate.from_messages([
  ("system", "你是世界级的技术专家"),
  ("user", "{input}"),
])

llm = ChatOpenAI(model="deepseek-chat", 
    openai_api_key="sk-ef4899dc2dda4b039b718df4c4014bcb", 
    base_url="https://api.deepseek.com/v1", 
    temperature=0.7)

chain = prompt | llm | StrOutputParser()


print(chain.invoke({"input": "帮我写一篇关于ai的文章,100个字"}))



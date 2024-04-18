import pandas as pd
import numpy as np

df = pd.read_csv("data.csv", header=16)

# csv 就是我的数据库, 然后可以通过 pandas 语法进行统计 分组等操作
# 然后将结果转成 xls 文件导出

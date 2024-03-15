import pandas as pd

data = pd.read_excel('test.xlsx')
data['name'] = data['年龄'].apply(lambda x:x.split('/')[0].strip())
data['sex'] = data['年龄'].apply(lambda x:x.split('/')[1].strip())

writer = pd.ExcelWriter('temp.xlsx')
# 这个 to_excel 可以用过 循环处理 生成多个 sheet 
data.to_excel(writer, sheet_name='xjh')
writer.close()
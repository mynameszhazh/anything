import requests
from lxml import etree

url = 'https://nba.hupu.com/stats/players'
headers = {
  'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' 
}

# 发送请求
resp = requests.get(url, headers=headers)

xp = etree.HTML(resp.text)
nbanames = xp.xpath('//table[@class="players_table"]//tr/td[2]/a/text()')
print(nbanames)
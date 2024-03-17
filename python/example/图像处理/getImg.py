import requests 
from lxml import etree

url = 'http://www.netbian.com/mei/'

resp = requests.get(url, headers={
  'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' 
})
resp.encoding = 'gbk'

# print(resp.text)

xp = etree.HTML(resp.text)

img_urls = xp.xpath('//ul/li/a/img/@src')
img_names = xp.xpath('//ul/li/a/img/@alt')

for i, u in zip(img_urls, img_names):
    # print(f'正在下载图片{u}')

    imgrep = requests.get(i, headers={
      'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' 
    })
    with open(f'./img/{u}.jpg', 'wb') as f: 
        f.write(imgrep.content)



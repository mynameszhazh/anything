from PIL import Image
import os

im = Image.open('./img/冬天 雪地 古风美女彭小苒壁纸.jpg')
# print(im.size)
w,h = im.size

image_row = 4
image_col = 4
names = os.listdir('./img')

new_img = Image.new('RGB', (image_col*w, image_row*h))
for y in range(image_row):
  for x in range(image_col):
    o_img = Image.open('./img/' + names[image_col * y + x])
    new_img.paste(o_img, (x*w, y*h))

new_img.save('xjh.jpg')
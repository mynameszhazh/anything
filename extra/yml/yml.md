# yml 文件的基本用法

## 1 常识: 文件扩展名

> 文件扩展名是一组三个或四个字符在文件名的末尾，在这种情况下， .yml. 文件扩展名告诉你它是什么类型的文件，并告诉 Windows 哪些程序可以打开它。窗户经常关联一个默认程序的每个文件的扩展名，这样，当你双击该文件，程序会自动启动。当该程序不再是您的 PC 上，有时可以得到一个错误，当您试图打开相关的文件。

## 2 YML 储备知识

### 2.1 YML 文件

- YAML 是一种用于文档的文件格式技术，它被保存在纯文本格式并附加了.yml 扩展名。它的主要目标是实现高效的数据序列化，使用户能够创建与特定标记语言无关的文件。这些文件可以在任何文本编辑器中创建、打开和编辑，同时 YAML 库也可用于将其集成到多种编程语言中。例如，在 Ruby on Rails 中，一个.yml 文件可以作为数据库文件实现编程功能。

### 2.2 打开 YML 文件

- 应用程序

```txt
Apple TextEdit
Notepad2
Microsoft Notepad
Microsoft Write
Microsoft WordPad
```

### 2.3 适应场景

- 脚本语言：由于实现简单，解析成本很低，YAML 特别适合在脚本语言中使用
- 序列化： `YAML` 是由宿主语言数据类型直转，的比较适合做序列化。
- 配置文件：写 `YAML` 要比写 `XML` 快得多(无需关注标签或引号)，并且比 `INI` 文档功能更强。由于兼容性问题，不同语言间的数据流转建议不要用 YAML。

### 2.4 语言优点

- `YAML` 易于人们阅读。
- `YAML` 数据在编程语言之间是可移植的。
- `YAML` 匹配敏捷语言的本机数据结构。
- `YAML` 具有一致的模型来支持通用工具。
- `YAML` 支持单程处理。
- `YAML` 具有表现力和可扩展性。
- `YAML` 易于实现和使用。

## 3 YAML 基本语法

- `分层`：使用空格 Space 缩进表示分层，不同层次之间的缩进可以使用不同的空格数目，但是同层元素一定左对齐，即前面空格数目相同（不能使用 Tab，各个系统 Tab 对应的 Space 数目可能不同，导致层次混乱）
- `注释`：‘#’表示注释，只能单行注释，从#开始处到行尾
- `列表`： 破折号后面跟一个空格（a dash and space）表示列表
- `键值对`：用冒号和空格表示键值对 key: value
- `数据`： 简单数据（scalars，标量数据）可以不使用引号括起来，包括字符串数据。用单引号或者双引号括起来的被当作字符串数据，在单引号或双引号中使用 C 风格的转义字符

## 4 YAML 基本用法

### 4.1 基本语法

> 以空格的缩进来控制层级关系；只要是左对齐的一列数据，都是同一个层级的

```yml
server:
  port: 8081
  path: /hello
```

### 4.2 值的写法

- 字面量: 普通的值（数字，字符串，布尔）

  > ​ k: v：字面直接来写；
  > ​ 字符串默认不用加上单引号或者双引号；
  > ​ “”：双引号；不会转义字符串里面的特殊字符；特殊字符会作为本身想表示的意思
  > ​ name: “zhangsan \n lisi”：输出；zhangsan 换行 lisi
  > ​ ”：单引号；会转义特殊字符，特殊字符最终只是一个普通的字符串数据
  > ​ name: ‘zhangsan \n lisi’：输出；zhangsan \n lisi

- 对象、Map（属性和值）（键值对）：

- 数组（List、Set）：

```
pets:
 - cat
 - dog
 - pig
```

or

```
pets: [cat,dog,pig]
```

## 5 YAML 应用

> YAML 是一种直观的能够被电脑识别的的数据序列化格式，容易被人类阅读，并且容易和脚本语言交互。YAML 类似于 XML，但是语法比 XML 简单得多，对于转化成数组或可以 hash 的数据时是很简单有效的。

### 5.1 PyYaml

1、load() :返回一个对象

我们先创建一个 yml 文件，config.yml:

```
name: Tom Smith
age: 37
spouse:
    name: Jane Smith
    age: 25
children:
 - name: Jimmy Smith
   age: 15
 - name1: Jenny Smith
   age1: 12

```

读取 yml 文件：

```

import yaml
f = open(r'E:\AutomaticTest\Test_Framework\config\config.yml')
y = yaml.load(f)
print (y)

```

### 5.2 js 中使用 yaml

- example

```js
const yaml = require('js-yaml')
const fs = require('fs')

try {
  const data = fs.readFileSync('example.yml', 'utf8')
  const yamlData = yaml.load(data)
  console.log(yamlData)
} catch (e) {
  console.log(e)
}
```

### 5.3 语法

- !!

  - 通过这个语法强制转换类型

- '' | ""

  - 一个全部是字符串, 一个可以写一些特俗字符

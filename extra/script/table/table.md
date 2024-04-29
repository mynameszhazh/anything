# mammoth

```js
const mammoth = require('mammoth');

mammoth.convertToHtml({path: './month.docx'})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        console.log(html);
    })
    .done();
```

## 获取到docx文件的内容

```js
const mammoth = require('mammoth');
const cheerio = require('cheerio');

mammoth.convertToHtml({path: './test.docx'})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion

        const $ = cheerio.load(html);
        $('table').each((index, element) => {
            const tableData = [];
            $(element).find('tr').each((i, elem) => {
                const row = [];
                $(elem).find('td').each((j, el) => {
                    row.push($(el).text());
                });
                tableData.push(row);
            });
            console.log(tableData);
        });
    })
    .done();
```
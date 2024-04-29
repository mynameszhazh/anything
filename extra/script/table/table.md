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
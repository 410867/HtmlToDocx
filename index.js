const fs = require('fs');
// FIXME: Incas you have the npm package
const HTMLtoDOCX = require('html-to-docx');

let terminal_data = process.argv;
const htmlFilePath = terminal_data[2];                  // html file: "../../fileHTML/file.html" or "https://www.google.com/"
const filePath = terminal_data[3];                      // docx file: "../../filePath/example.docx"

(async () => {
    if(htmlFilePath.includes('http://') || htmlFilePath.includes('https://')) {
        const request = require('request');
        request(htmlFilePath, async function (error, response, htmlString) {
            const fileBuffer = await HTMLtoDOCX(htmlString, null, {
                table: {row: {cantSplit: true}},
                footer: true,
                pageNumber: true,
            });

            fs.writeFile(filePath, fileBuffer, (error) => {
                if (error) {
                    console.log('Docx file creation failed');
                    return;
                }
                console.log('Docx file created successfully');
            });
        });
    } else {
        fs.readFile(htmlFilePath, 'utf-8', async (err, htmlString) => {
            if (err) throw err;

            const fileBuffer = await HTMLtoDOCX(htmlString, null, {
                table: {row: {cantSplit: true}},
                footer: true,
                pageNumber: true,
            });

            fs.writeFile(filePath, fileBuffer, (error) => {
                if (error) {
                    console.log('Docx file creation failed');
                    return;
                }
                console.log('Docx file created successfully');
            });
        });
    }
})();
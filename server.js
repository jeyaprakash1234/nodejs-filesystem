const express = require('express');
const fs = require('fs');
const moment = require('moment');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.post('/create-file', (req, res) => {
    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `${timestamp}.txt`;
    const content = `Current timestamp: ${moment().format()}`;

    fs.writeFile(path.join(__dirname, 'files', filename), content, (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.send('File created successfully');
    });
});

app.get('/get-files', (req, res) => {
    const directoryPath = path.join(__dirname, 'files');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        const textFiles = files.filter(file => path.extname(file) === '.txt');
        res.json(textFiles);
    });
});


if (!fs.existsSync(path.join(__dirname, 'files'))) {
    fs.mkdirSync(path.join(__dirname, 'files'));
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

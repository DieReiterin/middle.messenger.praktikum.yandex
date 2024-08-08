import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(path.join('dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(3000);

import express from 'express'

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('bruh');
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
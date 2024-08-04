const app = require('express')()

app.get('/', (req, res) => {
    res.send("Hi")
})

const port = 8000
app.listen(port, () => { console.log(`Listening on Port ${port}`) })

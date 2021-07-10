const express = require('express')
const pool = require('./db')
const app = express()
const port = 8000

app.use(express.json());

app.get("/list",async (req,res) => {
    try {
        const allTiket = await pool.query('select * from public.Tiket');
        res.json(allTiket.rows);
    } catch (error) {
        console.error(error.message)
    }
})


app.post("/komplain",async(req,res)=>{
    try {
        const { user_name,description } = req.body;
        const newTodo = await pool.query('INSERT INTO public.Tiket (user_name,description) VALUES($1,$2) RETURNING *',[user_name,description]);

        res.json(newTodo.rows[0]);
        // console.log(description)
    } catch (err) {
        console.error(err.message)
    }
  }
)

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })



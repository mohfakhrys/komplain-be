const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require('./db')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/allCR", (req, res) => {
  pool.query(
    "select * from public.tiket_change ",
    [],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

app.get("/done", (req, res) => {
  pool.query(
    "select * from public.tiket a join public.users b on a.id=b.id where a.status = 'Done'",
    [],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

app.get("/inprogress", (req, res) => {
  pool.query(
    "select * from public.tiket a join public.users b on a.id=b.id where status='In Progress'",
    [],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

app.get("/new", (req, res) => {
    pool.query(
      "select * from public.tiket a join public.users b on a.id=b.id  where status='NEW'",
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.status(200).json(results.rows);
      }
    );
  });

  app.get("/pending", (req, res) => {
    pool.query(
      "select * from public.tiket a join public.users b on a.id=b.id where status='Pending'",
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.status(200).json(results.rows);
      }
    );
  });

  app.put("/assign/id_tiket=:id",async(req,res)=>{
    try {
        const { id } = req.params;
        // console.log(id)
        const { pekerja } = req.body;
        console.log(pekerja)
        const newTodo = await pool.query('UPDATE public.tiket SET pekerja= $1 WHERE id_tiket = $2 ',[pekerja, id]);
        res.json("Updated");
    } catch (err) {
        res.json(err)
    }
  }
)

app.put("/status/id_tiket=:id",async(req,res)=>{
  try {
      const { id } = req.params;
      const { statusTiket } = req.body;
      // console.log(statusTiket)
      const newTodo = await pool.query('UPDATE public.tiket SET status= $1 WHERE id_tiket = $2 ',[statusTiket, id]);
      res.json("Updated");
  } catch (err) {
      res.json(err)
  }
}
)

app.put("/submit/id_tiket=:id",async(req,res)=>{
  try {
      const { id } = req.params;
      const { jawaban } = req.body;
      // console.log(jawaban)
      const newTodo = await pool.query('UPDATE public.tiket SET jawaban= $1 WHERE id_tiket = $2 ',[jawaban, id]);
      res.json("Updated");
  } catch (err) {
      res.json(err)
  }
}
)

app.get("/user/username=:username",async(req,res)=>{
  const {username}  = req.params;
  try {
    const todo = await pool.query("select * from public.users where user_name = $1",[username])
    res.json(todo.rows[0])
    // console.log(todo.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})

  app.get("/tiket/list/id_tiket=:id",async(req,res)=>{
    const {id}  = req.params;
    try {
      const todo = await pool.query("select * from public.tiket a join public.users b on a.id = b.id where id_tiket = $1",[id])
      res.json(todo.rows[0])
    } catch (error) {
      console.error(error.message)
    }
  })

  app.post("/komplain",async(req,res)=>{
    try {
        const { id,description,katagori } = req.body;
        const status = "NEW"
        const newTodo = await pool.query('INSERT INTO public.tiket (id, komplain,status,katagori) VALUES($1,$2,$3,$4) RETURNING *',[id,description,status,katagori]);
        res.json(newTodo.rows[0]);
        // console.log(description)
    } catch (err) {
        console.error(err.message)
    }
  }
)

app.put("/approval/:id_tiket_change_requestd",async(req,res)=>{
    try {
        const { id_tiket_change_requestd } = req.params;
        const { status } = req.body;
        const newTodo = await pool.query('UPDATE public.tiket_change_request SET status_change_request= $1 WHERE id_tiket_change_request = $2 ',[status, id_tiket_change_requestd]);
        res.json("Updated");
    } catch (err) {
        console.error(err.message)
    }
  }
)



  app.get("/approve", (req, res) => {
    pool.query(
      "select * from public.tiket_change_request  where status_change='APPROVE'",
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.status(200).json(results.rows);
      }
    );
  });

  app.get("/reject", (req, res) => {
    pool.query(
      "select * from public.tiket_change_request  where status_change='REJECT'",
      [],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        res.status(200).json(results.rows);
      }
    );
  });

app.post("/Change",async(req,res)=>{
  try {
      const { username,description } = req.body;
      // const status = "NEW"
      const newTodo = await pool.query('INSERT INTO public.tiket_change (user_operasional, keterangan) VALUES($1,$2) RETURNING *',[username,description]);
      res.json(newTodo.rows[0]);
      // console.log(description)
  } catch (err) {
      console.error(err.message)
  }
}
)

app.use(cors());
app.use(bodyParser.json());

app.listen(8000, () => {
  console.log(`Server is running.`);
});
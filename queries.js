const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'komplain',
  password: '123',
  port: 5432,
})

const createTiket = (request, response) => {
    const { user_name, komplain } = request.body
  
    pool.query('INSERT INTO public.tiket (user_name, komplain) VALUES ($1, $2)', [user_name, komplain], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }

  module.exports = {
    createTiket
  }
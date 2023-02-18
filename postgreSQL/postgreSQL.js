require('dotenv').config()

const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.PG_URI || 'localhost',
  user: process.env.PG_USER || 'postgres',
  port: process.env.PG_PORT || '5432',
  database: process.env.PG_DATABASE || 'postgres',
  password: process.env.PG_PASSWORD || '',
  max: 10,
  // connectionTimeoutMillis: 2000,
  // idleTimeoutMillis: 30000,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.on('connect', (client) => {
  console.log(
    `Client ${client.user} connect to database ${client.database} at ${client.host} on port ${client.port}`
  )
})

pool.on('acquire', (client) => {
  console.log(
    `Client ${client.user} disconnect from database ${client.database} at ${client.host} on port ${client.port}`
  )
})

// const client = await pool.connect()

module.exports = pool

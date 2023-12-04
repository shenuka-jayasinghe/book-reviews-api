const Pool = require("pg").Pool

const ENV = process.env.NODE_ENV || "prod"
const pathToEnvFile = `${__dirname}/../.env.${ENV}`
console.log(ENV)
require("dotenv").config({ path : pathToEnvFile })
const PGDATABASE = process.env.PGDATABASE
const PGPASSWORD = process.env.PGPASSWORD
const PGUSER = process.env.PGUSER
const PGPORT = process.env.PGPORT
const PGHOST = process.env.PGHOST
console.log("HOST IS --->",PGHOST)

const pool = new Pool({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: PGPORT,
  database: PGDATABASE,
  ssl: true
})

module.exports = pool;

//need to update password before commit
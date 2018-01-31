import mysql from 'mysql'
// import 'join-monster'

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hd'
}

let pool
export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({ ...connectionConfig, connectionLimit: 10 })
  }
  return pool
}

export const queryResult = sql => new Promise((resolve, reject) =>
  getPool().query(sql, (error, results, fields) => {
    if (error) return reject(error)
    resolve(results)
  }))

import mysql from 'mysql'
import Sequelize from 'sequelize'

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

export const initModels = async () => {
  const { host, user, password, database } = connectionConfig
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql', host })
  const accounts = sequelize.import('./models/accounts')
  const comments = sequelize.import('./models/comments')
  const posts = sequelize.import('./models/posts')

  await sequelize.sync()
  const a = await posts.findAll()
  console.log(a)
}

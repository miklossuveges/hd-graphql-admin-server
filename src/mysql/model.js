import sequelize, { DataTypes } from 'sequelize'

const { host, user, password, database } = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hd'
}

export const createModels = () => {
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql', host });
  sequelize.define('Account', {
    // id: { type: DataTypes.}
  })
}

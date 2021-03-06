/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('comments', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id'
      }
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'comments',
    timestamps: false
  })
}

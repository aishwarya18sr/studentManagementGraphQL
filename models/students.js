/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Students.init({
    name: DataTypes.STRING,
    rollNo: DataTypes.INTEGER,
    class: DataTypes.STRING,
    section: DataTypes.STRING,
    totalMarks: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Students;
};

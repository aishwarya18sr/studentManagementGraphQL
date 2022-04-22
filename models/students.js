const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    static associate() {
    }
  }
  Students.init({
    rollNo: DataTypes.INTEGER,
    name: DataTypes.STRING,
    class: DataTypes.INTEGER,
    section: DataTypes.STRING,
    totalMarks: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Students;
};

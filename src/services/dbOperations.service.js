const { Students } = require('../../models');

const getStudentsByClass = async (givenClass) => {
  const students = await Students.findAll({
    attributes: { exclude: ['createdAt,updatedAt'] },
    where: {
      class: givenClass,
    },
    order: [['id', 'ASC']],
  });
  return students;
};

module.exports = {
  getStudentsByClass,
};

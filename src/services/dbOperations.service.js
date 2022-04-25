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

const getStudentsByClassSection = async (givenClass, givenSection) => {
  const students = await Students.findAll({
    attributes: { exclude: ['createdAt,updatedAt'] },
    where: {
      class: givenClass,
      section: givenSection,
    },
    order: [['id', 'ASC']],
  });
  return students;
};

const getStudentsByMarks = async (givenTotalMarks) => {
  const students = await Students.findAll({
    attributes: { exclude: ['createdAt,updatedAt'] },
    where: {
      totalMarks: givenTotalMarks,
    },
    order: [['id', 'ASC']],
  });
  return students;
};

module.exports = {
  getStudentsByClass, getStudentsByClassSection, getStudentsByMarks,
};

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

const updateStudent = async (givenRollNo, givenName, givenClass, givenSection, givenTotalMarks) => {
  await Students.update({
    name: givenName,
    class: givenClass,
    section: givenSection,
    totalMarks: givenTotalMarks,
  }, {
    where: {
      rollNo: givenRollNo,
    },
  });
  const students = await Students.findOne({
    attributes: { exclude: ['createdAt,updatedAt'] },
    where: {
      rollNo: givenRollNo,
    },
  });
  return students;
};

module.exports = {
  getStudentsByClass, getStudentsByClassSection, getStudentsByMarks, updateStudent,
};

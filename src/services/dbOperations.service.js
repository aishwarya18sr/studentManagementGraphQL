const { Students } = require('../../models');

const getStudents = async () => {
  const students = await Students.findAll({
    attributes: { exclude: ['createdAt,updatedAt'] },
    order: [['id', 'ASC']],
  });
  return students;
};

const getStudentById = async (id) => {
  const student = await Students.findAll({
    attributes: { exclude: ['createdAt,updatedAt'] },
    where: {
      id,
    },
  });
  return student;
};

const addStudent = async (studentName, studentClass, section, rollNo, totalMarks) => {
  const obj = {
    name: studentName,
    class: studentClass,
    section,
    rollNo,
    totalMarks,
  };
  await Students.create(obj);
  const students = await Students.findAll({
    attributes: { exclude: ['createdAt,updatedAt'] },
    order: [['id', 'ASC']],
  });
  return students;
};

const deleteStudent = async (id) => {
  await Students.destroy({
    where: {
      id,
    },
  });
  const students = await Students.findAll({
    attributes: { exclude: ['createdAt,updatedAt'] },
    order: [['id', 'ASC']],
  });
  return students;
};
const getStudentsByClass = async (givenClass) => {
  const students = await Students.findAll({
    attributes: { exclude: ['createdAt,updatedAt'] },
    where: {
      class: givenClass,
    },
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
  addStudent,
  getStudentById,
  getStudents,
  deleteStudent,
  getStudentsByClass,
  getStudentsByClassSection,
  getStudentsByMarks,
};

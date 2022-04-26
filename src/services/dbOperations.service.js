const { Students } = require('../../models');

const getStudents = async () => {
  const students = await Students.findAll({
    attributes: { exclude: ['createdAt,updatedAt'] },
    order: [['id', 'ASC']],
  });
  return students;
};

const getStudentById = async (id) => {
  const student = await Students.findOne({
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
  const students = await Students.findOne({
    attributes: { exclude: ['createdAt,updatedAt'] },
    where: obj,
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

const updateStudent = async (givenId, givenRollNo, givenName, givenClass, givenSection, givenTotalMarks) => {
  await Students.update({
    id: givenId,
    name: givenName,
    class: givenClass,
    section: givenSection,
    totalMarks: givenTotalMarks,
  }, {
    where: {
      id: givenId,
    },
  });
  const students = await Students.findOne({
    attributes: { exclude: ['createdAt,updatedAt'] },
    where: {
      id: givenId,
    },
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
  updateStudent,
};

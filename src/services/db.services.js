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

module.exports = {
  addStudent,
  getStudentById,
  getStudents,
};
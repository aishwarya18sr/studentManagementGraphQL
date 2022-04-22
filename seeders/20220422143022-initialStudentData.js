module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Students', [{
      rollNo: '18',
      name: 'Smriti',
      class: 3,
      section: 'E',
      totalMarks: 90.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      rollNo: '3',
      name: 'Mithali',
      class: 8,
      section: 'B',
      totalMarks: 96.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Students', null, {});
  },
};

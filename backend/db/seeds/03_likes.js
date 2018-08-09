
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        { postId: 1, userId: 2},
        { postId: 1, userId: 4},
        { postId: 1, userId: 3}
      ]);
    });
};

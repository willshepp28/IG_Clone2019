
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        { photo: 'http://maltisudhatravels.com/wp-content/uploads/2015/05/dubai-22.jpg', caption: 'Iam living my life baby', user_id: 1},
        { photo: 'https://target.scene7.com/is/image/Target/14549692', caption: "I just wanna be the greatest", user_id: 3},
        { photo: 'https://pbs.twimg.com/profile_images/820357473802612736/qGK_QGPM_400x400.jpg', caption: "I wanna travel", user_id: 2},
        { caption: "What the hell is thisssssssss", user_id: 5},
        { caption: "Life is awesome", user_id: 1},
        { caption: "Iam the best ever", user_id: 1},
        { caption: "Iam a $10000000000 man", user_id: 1}
      ]);
    });
};


exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable();
        table.string("profilePic").notNullable().defaultTo("https://www.twistt.net/assets/img/profile-placeholder.png");
        table.string("email").notNullable();
        table.text("password").notNullable();
        table.text("phone_number");
        table.boolean("profile_privacy").defaultTo(true);
        table.timestamp('date_joined').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("users");
};

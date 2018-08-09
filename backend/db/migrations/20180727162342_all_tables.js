
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
    .createTable("posts", (table) => {
        table.increments();
        table.string("photo").notNullable().defaultTo("https://jlfarchitects.com/wp-content/uploads/2015/03/img-placeholder-300x300.jpg");
        table.text("caption").notNullable();
        table.integer("user_id").unsigned().references("id").inTable("users").onDelete("cascade");
        table.timestamp("date_created").defaultTo(knex.fn.now());
    })
    .createTable("likes", ( table) => {
        table.increments();
        table.integer("postId").unsigned().references("id").inTable("posts");
        table.integer("userId").unsigned().references("id").inTable("users");
        table.timestamp("data_liked").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("posts").dropTable("users");
};

// const humps = require('humps');

module.exports = (pool) => ({
  getUsersByIds(userIds) {
    return pool.query(`
      select id, email,
      'User' as type
      from users
      where id = ANY($1)
    `, [userIds]).then(result => result.rows);
  },

  getUsers() {
    return pool.query(`
      select * from users
    `).then(result => result.rows);
  }
});

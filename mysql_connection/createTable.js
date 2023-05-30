const query = require("./mysqlWrapper")

const SPRING_SECURITY_USERS_SQL = `
  create table users(
    username varchar(50) not null primary key,
    password varchar(500) not null,
    enabled boolean not null
  );
`
const SPRING_SECURITY_AUTHORITIES_SQL = `
  create table authorities (
    username varchar(50) not null,
    authority varchar(50) not null,
    constraint fk_authorities_users foreign key(username) references users(username)
  );
`

query(SPRING_SECURITY_USERS_SQL, (err, result) => {
  if ( err ) throw err;
  console.log("result: " + result);
})
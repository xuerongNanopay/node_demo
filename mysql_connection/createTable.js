const query = require("./mysqlWrapper")
console.log((query))
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
const SPRING_SECURITY_AUTH_USERNAME_INDEX = `
  create unique index idx_auth_username on authorities(username, authority);
`

const SHOW_INDEX = `
  show index from authorities;
`

query(SHOW_INDEX, (err, results) => {
  if ( err ) throw err;
  console.log("Success");
  for ( let ret of results ) {
    console.log(ret)
  }
})
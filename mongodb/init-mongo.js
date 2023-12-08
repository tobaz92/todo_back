db.createUser({
  user: process.env.DATABASE_USER,
  pwd: process.env.DATABASE_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: process.env.DATABASE_NAME,
    },
  ],
})

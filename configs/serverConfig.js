module.exports = {
  DB: process.env.DATABASE || 'mongodb://localhost:27017/randomnotes',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

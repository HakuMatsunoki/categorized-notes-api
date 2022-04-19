process.on('uncaughtException', (err) => {
  console.log('==============> Uncaught exception', err);
  process.exit(1);
});

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const noteRouter = require('./routes/noteRoutes');
const serverConfig = require('./configs/serverConfig');

// EXPRESS APP =========================================
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ROUTES ============================================
app.use('/api/notes', noteRouter);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server..`, 404));
});

app.use(globalErrorHandler);

// DB connection ==========================================
mongoose
  .connect(serverConfig.DB)
  .then(() => {
    console.log('Connection OK');
  })
  .catch((err) => {
    console.log(err);
  });

// SERVER ================================================
const port = serverConfig.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('===========> unhandled rejection', err);
  server.close(() => {
    process.exit(1);
  });
});

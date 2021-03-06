/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const chalk = require('chalk');
const connect = require('../utils/connection');
const Report = require('../models/Report');
const reportsData = require('./reports.json');

const run = async () => {
  await connect();

  try {
    await Report.collection.drop();
    // eslint-disable-next-line no-empty
  } catch {}

  await Report.createCollection();

  for (const e of reportsData.elements) {
    await Report.create({...e, created: Date.parse(e.created)});
  }
};

run()
  .then(() => {
    console.log(chalk.green('provision completed'));
    process.exit();
  })
  .catch((err) => {
    console.log(chalk.red(err.stack));
    process.exit(1);
  });

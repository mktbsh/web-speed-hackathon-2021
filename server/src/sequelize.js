import { Sequelize } from 'sequelize';

import { DATABASE_PATH } from './paths';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: DATABASE_PATH,
  pool: {
    max: 4,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export { sequelize };

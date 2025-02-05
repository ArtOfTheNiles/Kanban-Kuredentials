import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

const makeSequelize = () => {
  if (process.env.DATABASE_URL) {
    // Production environment (Render.com)
    return new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });
  } else {
    // Local development environment
    return new Sequelize(
      process.env.DB_NAME ? process.env.DB_NAME : '',
      process.env.DB_USER ? process.env.DB_USER : '',
      process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
      {
        host: 'localhost',
        dialect: 'postgres',
        port: 3001,
      }
    );
  }
};

const sequelize = makeSequelize();

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

export { sequelize, User, Ticket };

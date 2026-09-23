import { openDatabase, migrate } from '../src/database.js';
const db=openDatabase(); migrate(db); db.close(); console.log('Migrations aplicadas.');

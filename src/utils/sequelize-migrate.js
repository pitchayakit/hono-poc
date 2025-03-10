import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Initializes and runs database migrations using Sequelize and Umzug
 */
async function runMigrations() {
  try {
    console.log('Starting database migrations...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // List migration files manually
    const migrationsDir = __dirname;
    console.log('Migrations directory:', migrationsDir);
    
    const files = await fs.readdir(migrationsDir);
    console.log('Files in migrations directory:', files);
    
    const migrationFiles = files.filter(file => 
      file.endsWith('.js') && 
      !file.includes('sequelize-migrate.js') && 
      !file.includes('README.md')
    );
    
    console.log('Migration files found:', migrationFiles);
    
    // Initialize Umzug for Sequelize migrations
    const umzug = new Umzug({
      migrations: { 
        glob: 'src/migrations/*.js',
        // Exclude this file and helper files
        filter: (file) => {
          console.log('Checking migration file:', file);
          return !file.includes('sequelize-migrate.js') && !file.includes('README.md');
        }
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });
    
    console.log('Checking pending migrations...');
    const pending = await umzug.pending();
    console.log(`Found ${pending.length} pending migrations:`, pending.map(m => m.name));
    
    // Run all pending migrations
    console.log('Running migrations...');
    const migrations = await umzug.up();
    
    if (migrations.length === 0) {
      console.log('No migrations were executed, database schema already up to date');
    } else {
      console.log(`Executed ${migrations.length} migrations:`, migrations.map(m => m.name));
    }
    
    console.log('Database migration completed successfully');
    return true;
  } catch (error) {
    console.error('Database migration failed:', error);
    return false;
  }
}

// If this script is run directly
if (import.meta.url.endsWith('sequelize-migrate.js')) {
  runMigrations()
    .then(success => {
      if (success) {
        console.log('Migration process completed successfully');
        process.exit(0);
      } else {
        console.error('Migration process failed');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Unexpected error during migration:', error);
      process.exit(1);
    });
}

export { runMigrations }; 
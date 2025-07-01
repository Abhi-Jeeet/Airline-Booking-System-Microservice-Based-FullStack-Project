const { Sequelize } = require('sequelize');
const config = require('./src/config/config.json');

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      port: config.development.port,
      dialect: config.development.dialect,
      logging: false,
      dialectOptions: config.development.dialectOptions,
      pool: config.development.pool
    }
  );

  try {
    await sequelize.authenticate();
    console.log('✅ Successfully connected to Supabase!');
    
    // Test a simple query
    const [results] = await sequelize.query('SELECT NOW() as current_time');
    console.log('✅ Database query test successful:', results[0]);
    
    // Check if tables exist
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Available tables:');
    tables.forEach(table => {
      console.log(`   - ${table.table_name}`);
    });
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your Supabase credentials in config.json');
    console.log('2. Verify your Supabase project is active');
    console.log('3. Check if your IP is allowed in Supabase settings');
    console.log('4. Ensure SSL configuration is correct');
  } finally {
    await sequelize.close();
  }
}

testConnection(); 
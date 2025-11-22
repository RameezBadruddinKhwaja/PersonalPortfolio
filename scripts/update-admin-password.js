/**
 * Admin Password Update Script
 *
 * This script helps you update the admin password securely.
 * It will generate a bcrypt hash and show you what to put in .env
 *
 * Usage: node scripts/update-admin-password.js
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=================================');
console.log('  Admin Password Update Tool');
console.log('=================================\n');

rl.question('Enter your new admin password: ', async (password) => {
  if (!password || password.length < 8) {
    console.error('\n❌ Error: Password must be at least 8 characters long!');
    rl.close();
    process.exit(1);
  }

  try {
    // Generate hash with 10 salt rounds (same as current)
    const hash = await bcrypt.hash(password, 10);

    console.log('\n✅ Password hash generated successfully!\n');
    console.log('=================================');
    console.log('Copy this value to your .env file:');
    console.log('=================================\n');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('\n=================================');
    console.log('Steps to update:');
    console.log('=================================');
    console.log('1. Open your .env file');
    console.log('2. Find the line: ADMIN_PASSWORD_HASH=...');
    console.log('3. Replace it with the value above');
    console.log('4. Save the file');
    console.log('5. For Vercel: Add this to Environment Variables in dashboard');
    console.log('\n✅ Done!');

  } catch (error) {
    console.error('\n❌ Error generating hash:', error);
    process.exit(1);
  }

  rl.close();
});

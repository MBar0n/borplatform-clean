import admin from 'firebase-admin';

admin.initializeApp();
const firestore = admin.firestore();

async function testConnection() {
  try {
    console.log('Attempting to read authAllowlist/emails...\n');

    const emailDoc = await firestore.doc('authAllowlist/emails').get();

    if (emailDoc.exists) {
      console.log('✅ Successfully connected to Firestore!');
      console.log('\n📧 Email Allowlist Document:');
      const data = emailDoc.data();
      console.log(JSON.stringify(data, null, 2));

      if (data.items && Array.isArray(data.items)) {
        console.log(`\n📋 Found ${data.items.length} email(s) in allowlist:`);
        data.items.forEach((email, index) => {
          console.log(`  ${index + 1}. ${email}`);
        });
      }
    } else {
      console.log('❌ Document does not exist at path: authAllowlist/emails');
    }

    console.log('\n---\n');
    console.log('Attempting to read authAllowlist/domains...\n');

    const domainDoc = await firestore.doc('authAllowlist/domains').get();

    if (domainDoc.exists) {
      console.log('✅ Domain Allowlist Document exists!');
      console.log('\n🌐 Domain Allowlist Document:');
      const data = domainDoc.data();
      console.log(JSON.stringify(data, null, 2));

      if (data.items && Array.isArray(data.items)) {
        console.log(`\n📋 Found ${data.items.length} domain(s) in allowlist:`);
        data.items.forEach((domain, index) => {
          console.log(`  ${index + 1}. ${domain}`);
        });
      }
    } else {
      console.log('ℹ️  Document does not exist at path: authAllowlist/domains (this is optional)');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error connecting to Firestore:', error);
    process.exit(1);
  }
}

testConnection();

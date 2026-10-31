/**
 * Migration Script — Local MongoDB → MongoDB Atlas
 * Copies ALL collections from local to Atlas
 * Run: node scripts/migrate-to-atlas.js
 */

const { MongoClient } = require('mongodb')

const LOCAL_URI = 'mongodb://localhost:27017/MyPortfolio'
const ATLAS_URI = 'mongodb+srv://hasanabdikadir15_db_user:2HzWVxPQbAJdk7yk@myportfolio.szsigxs.mongodb.net/MyPortfolio?retryWrites=true&w=majority'

const migrate = async () => {
  let localClient, atlasClient

  try {
    console.log('🔌 Connecting to LOCAL MongoDB...')
    localClient = new MongoClient(LOCAL_URI)
    await localClient.connect()
    const localDb = localClient.db('MyPortfolio')

    console.log('🌐 Connecting to MongoDB ATLAS...')
    atlasClient = new MongoClient(ATLAS_URI)
    await atlasClient.connect()
    const atlasDb = atlasClient.db('MyPortfolio')

    // Get all collection names from local
    const collections = await localDb.listCollections().toArray()
    console.log(`\n📦 Found ${collections.length} collections to migrate:\n`)

    for (const col of collections) {
      const name = col.name
      const localCol = localDb.collection(name)
      const atlasCol = atlasDb.collection(name)

      // Get all documents from local
      const docs = await localCol.find({}).toArray()

      if (docs.length === 0) {
        console.log(`⏭️  Skipping "${name}" — empty collection`)
        continue
      }

      // Clear Atlas collection first
      await atlasCol.deleteMany({})

      // Insert all docs to Atlas
      await atlasCol.insertMany(docs)
      console.log(`✅ "${name}" — ${docs.length} documents migrated`)
    }

    console.log('\n🎉 ALL COLLECTIONS MIGRATED TO ATLAS SUCCESSFULLY!')

  } catch (err) {
    console.error('❌ Migration Error:', err.message)
  } finally {
    if (localClient) await localClient.close()
    if (atlasClient) await atlasClient.close()
    process.exit(0)
  }
}

migrate()

import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI_MISSING');
const prefixes = ['publish_','authfix_','authdiag_','e2e_fix_','logindiag_','scopeprobe_','lifecycle_','runtimeproof_'];
const escaped = prefixes.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const rx = new RegExp(`^(?:${escaped})`);
const client = new MongoClient(process.env.MONGODB_URI,{serverSelectionTimeoutMS:6000,connectTimeoutMS:6000});
await client.connect();
try {
  const db = client.db(process.env.MONGODB_DB || 'naruto_shinobi_no_sho');
  const rows = await db.collection('users').find({username:{$regex:rx}},{projection:{_id:1}}).limit(31).toArray();
  if (rows.length > 30) throw new Error(`DIAGNOSTIC_CLEANUP_REFUSED_${rows.length}`);
  const ids = rows.map((x) => x._id);
  if (ids.length) {
    await Promise.all([
      db.collection('sessions').deleteMany({userId:{$in:ids}}),
      db.collection('recovery_codes').deleteMany({userId:{$in:ids}}),
      db.collection('mechanical_profiles').deleteMany({userId:{$in:ids}}),
      db.collection('saves').deleteMany({userId:{$in:ids}}),
      db.collection('audit_events').deleteMany({userId:{$in:ids}}),
      db.collection('users').deleteMany({_id:{$in:ids}}),
    ]);
  }
  const remaining = await db.collection('users').countDocuments({username:{$regex:rx}});
  if (remaining !== 0) throw new Error(`DIAGNOSTIC_USERS_REMAIN_${remaining}`);
  console.log(JSON.stringify({status:'PASS_RUNTIME_DIAGNOSTIC_CLEANUP',deleted:ids.length}));
} finally {
  await client.close();
}

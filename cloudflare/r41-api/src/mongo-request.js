import { MongoClient } from "mongodb";

export const R41_MONGO_REQUEST_SCOPE = Symbol.for("r41.mongo.request.scope.v2");

export function createMongoRequestEnv(env){
  const scope={clients:[]};
  return new Proxy(env,{get(target,prop){if(prop===R41_MONGO_REQUEST_SCOPE)return scope;return target[prop];}});
}

function requestScope(env){
  const scope=env?.[R41_MONGO_REQUEST_SCOPE];
  if(!scope)throw new Error("MONGO_REQUEST_SCOPE_MISSING");
  return scope;
}

export async function requestMongoDb(env,fallbackDb="naruto_shinobi_no_sho"){
  const scope=requestScope(env);
  const client=new MongoClient(env.MONGODB_URI,{maxPoolSize:1,minPoolSize:0,maxIdleTimeMS:0,serverSelectionTimeoutMS:6000,connectTimeoutMS:6000});
  try{
    await client.connect();
    scope.clients.push(client);
    return client.db(env.MONGODB_DB||fallbackDb);
  }catch(e){
    try{await client.close();}catch{}
    throw e;
  }
}

export async function closeMongoRequestEnv(env){
  const scope=env?.[R41_MONGO_REQUEST_SCOPE];
  if(!scope)return;
  const clients=Array.isArray(scope.clients)?scope.clients.splice(0):[];
  await Promise.allSettled(clients.map(client=>client.close()));
}

import { MongoClient } from "mongodb";

export const R41_MONGO_REQUEST_SCOPE = Symbol.for("r41.mongo.request.scope.v1");

export function createMongoRequestEnv(env){
  const scope={client:null,clientPromise:null};
  return new Proxy(env,{get(target,prop){if(prop===R41_MONGO_REQUEST_SCOPE)return scope;return target[prop];}});
}

function requestScope(env){
  const scope=env?.[R41_MONGO_REQUEST_SCOPE];
  if(!scope)throw new Error("MONGO_REQUEST_SCOPE_MISSING");
  return scope;
}

export async function requestMongoDb(env,fallbackDb="naruto_shinobi_no_sho"){
  const scope=requestScope(env);
  if(!scope.clientPromise){
    scope.clientPromise=(async()=>{
      const client=new MongoClient(env.MONGODB_URI,{maxPoolSize:1,minPoolSize:0,maxIdleTimeMS:0,serverSelectionTimeoutMS:6000,connectTimeoutMS:6000});
      await client.connect();
      scope.client=client;
      return client;
    })().catch(e=>{scope.client=null;scope.clientPromise=null;throw e;});
  }
  const client=await scope.clientPromise;
  return client.db(env.MONGODB_DB||fallbackDb);
}

export async function closeMongoRequestEnv(env){
  const scope=env?.[R41_MONGO_REQUEST_SCOPE];
  if(!scope)return;
  let client=scope.client;
  if(!client&&scope.clientPromise){try{client=await scope.clientPromise;}catch{}}
  scope.client=null;
  scope.clientPromise=null;
  if(client){try{await client.close();}catch{}}
}

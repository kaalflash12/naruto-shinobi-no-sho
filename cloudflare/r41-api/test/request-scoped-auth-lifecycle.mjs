// retrigger request-scoped MongoDB publisher after confirmed register/login probe
const origin = String(process.env.API_ORIGIN || 'http://127.0.0.1:8787').replace(/\/+$/,'');
const suffix = `${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
const username = `runtimeproof_${suffix}`.slice(0,32);
const email = `${username}@example.test`;
const password = `Old!${suffix}aA9`;
const newPassword = `New!${suffix}zZ8`;

async function post(path,body={},token='',expected=[200]){
  const headers={'content-type':'application/json',accept:'application/json'};
  if(token) headers.authorization=`Bearer ${token}`;
  const res=await fetch(origin+path,{method:'POST',headers,body:JSON.stringify(body)});
  const raw=await res.text();
  let data={};
  try{data=raw?JSON.parse(raw):{};}catch{data={raw:raw.slice(0,300)};}
  console.log(JSON.stringify({path,status:res.status,ok:data?.ok??null,error:data?.error??null}));
  if(!expected.includes(res.status))throw new Error(`${path}:HTTP_${res.status}:${String(data?.error||'')}`);
  return data;
}

const reg=await post('/api/auth/register',{username,password,displayName:'Runtime Lifecycle Proof',email},'', [201]);
if(!(reg.ok&&reg.token&&reg.recoveryCode&&reg.account?.email===email))throw new Error('REGISTER_INVALID');
console.log('PASS_REGISTER');

const login=await post('/api/auth/login',{identifier:username,password});
if(!(login.ok&&login.token))throw new Error('LOGIN_INVALID');
console.log('PASS_LOGIN_USERNAME');

const me=await post('/api/auth/me',{},login.token);
if(me.account?.username!==username||me.account?.email!==email)throw new Error('ME_INVALID');
console.log('PASS_AUTH_ME');

const rotated=await post('/api/auth/recovery-code',{},login.token);
if(!(rotated.ok&&rotated.recoveryCode))throw new Error('RECOVERY_ROTATION_INVALID');
console.log('PASS_RECOVERY_ROTATION');

const recovered=await post('/api/auth/recover',{identifier:email,recoveryCode:rotated.recoveryCode,newPassword});
if(!(recovered.ok&&recovered.recovered===true))throw new Error('RECOVER_INVALID');
console.log('PASS_RECOVER');

await post('/api/auth/login',{identifier:username,password},'', [401]);
console.log('PASS_OLD_PASSWORD_REJECTED');

const login2=await post('/api/auth/login',{identifier:email,password:newPassword});
if(!(login2.ok&&login2.token))throw new Error('NEW_PASSWORD_LOGIN_INVALID');
console.log('PASS_LOGIN_EMAIL_NEW_PASSWORD');

const del=await post('/api/auth/delete-account',{},login2.token);
if(del.deleted!==true)throw new Error('DELETE_ACCOUNT_INVALID');
console.log('PASS_DELETE_ACCOUNT');

await post('/api/auth/me',{},login2.token,[401]);
console.log('PASS_DELETED_TOKEN_REJECTED');
console.log('PASS_REQUEST_SCOPED_MONGODB_FULL_AUTH_LIFECYCLE');

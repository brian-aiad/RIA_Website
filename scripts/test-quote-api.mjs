import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { createQuoteHandler, renderQuoteEmail } from '../server/quote.ts';
const payload = {name:'Test Visitor',email:'visitor@example.com',phone:'213-555-0123',coverage:'auto',message:'Please contact me about an auto quote.',website:'',idempotencyKey:'e87a4283-2cff-4ed9-bc89-20f7ba3302e0'};
const env = {NODE_ENV:'production',RESEND_API_KEY:'test-only-key',QUOTE_FROM_EMAIL:'Rafla <quotes@example.com>'};
function request(body = payload, overrides = {}) {
  const req = Readable.from([]); Object.assign(req, {method:'POST',body,headers:{origin:'https://www.raflainsurance.com','content-type':'application/json'},socket:{remoteAddress:'127.0.0.1'}},overrides);return req;
}
async function invoke(handler, req = request()) {
  const headers = {}; let content;
  const res = {statusCode:200,setHeader(k,v){headers[k]=v},end(s){content=JSON.parse(s)}};
  await handler(req,res);return {status:res.statusCode,headers,body:content};
}
const accepted = async () => new Response(JSON.stringify({id:'test-accepted'}),{status:200});
test('fixed recipient, safe branded HTML, reply-to, and stable retry key',async()=>{
 const calls=[];const h=createQuoteHandler({env,fetch:async(url,options)=>{calls.push({url,options});return accepted()}});
 assert.equal((await invoke(h)).status,200);assert.equal((await invoke(h)).body.ok,true);
 const sent=JSON.parse(calls[0].options.body);assert.deepEqual(sent.to,['raflainsurance@gmail.com']);assert.equal(sent.reply_to,payload.email);assert.match(sent.html,/New quote request/);assert.match(sent.text,/Test Visitor/);assert.equal(calls[0].options.headers['Idempotency-Key'],calls[1].options.headers['Idempotency-Key']);
 await invoke(h,request({...payload,message:'Different request'}));assert.notEqual(calls[0].options.headers['Idempotency-Key'],calls[2].options.headers['Idempotency-Key']);
 const escaped=renderQuoteEmail({...payload,name:'<b>Visitor</b>',message:'<img src=x onerror=alert(1)>\nNext line'});assert.doesNotMatch(escaped.html,/<img src=x/);assert.match(escaped.html,/&lt;img/);assert.match(escaped.html,/<br>Next line/);
});
test('unconfigured service never claims success',async()=>{
 let calls=0;const h=createQuoteHandler({env:{NODE_ENV:'production'},fetch:async()=>{calls++;return accepted()}});assert.equal((await invoke(h)).status,503);assert.equal(calls,0);
});
test('upstream refusal, malformed receipt, and timeouts never claim success',async()=>{
 for(const send of [async()=>new Response('{}',{status:401}),async()=>new Response('{}',{status:200}),async()=>{throw new Error('timeout')}]){
  const r=await invoke(createQuoteHandler({env,fetch:send}));assert.equal(r.status,502);assert.equal(r.body.ok,false);
 }
});
test('invalid fields, header injection and honeypot never reach delivery',async()=>{
 for(const change of [{email:'bad'},{email:'visitor@example.com\r\nBcc: other@example.com'},{name:'Visitor\r\nInjected'},{phone:'-------'},{coverage:'__proto__'},{message:'x'.repeat(2001)},{website:'spam.test'},{idempotencyKey:'invalid'}]){
  let calls=0;const h=createQuoteHandler({env,fetch:async()=>{calls++;return accepted()}});const r=await invoke(h,request({...payload,...change}));assert.equal(r.status,422,JSON.stringify(change));assert.equal(calls,0);
 }
});
test('request method, origin, content-type and size enforced',async()=>{
 for(const [overrides,expected] of [[{method:'GET'},405],[{headers:{origin:'https://evil.example','content-type':'application/json'}},403],[{headers:{}},403],[{headers:{origin:'https://www.raflainsurance.com','content-type':'text/plain'}},415],[{headers:{origin:'https://www.raflainsurance.com','content-type':'application/json','content-length':'12001'}},413]]) {
  assert.equal((await invoke(createQuoteHandler({env,fetch:accepted}),request(payload,overrides))).status,expected);
 }
 assert.equal((await invoke(createQuoteHandler({env,fetch:accepted}),request('not json'))).status,400);
 assert.equal((await invoke(createQuoteHandler({env,fetch:accepted}),request({...payload,message:'x'.repeat(13000)}))).status,413);
});
test('streamed JSON body supported locally',async()=>{
 const req=request();delete req.body;const stream=Readable.from([Buffer.from(JSON.stringify(payload))]);Object.assign(stream,{method:req.method,headers:req.headers,socket:req.socket});
 assert.equal((await invoke(createQuoteHandler({env,fetch:accepted}),stream)).status,200);
});
test('per-instance rate guard expires and sets Retry-After',async()=>{
 let now=0;const h=createQuoteHandler({env,fetch:accepted,now:()=>now});for(let i=0;i<5;i++)assert.equal((await invoke(h)).status,200);const r=await invoke(h);assert.equal(r.status,429);assert.equal(r.headers['Retry-After'],'600');now=600001;assert.equal((await invoke(h)).status,200);
});

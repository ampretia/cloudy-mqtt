const MQTT = require("async-mqtt");
const beautify = require("json-beautify"); 

let mqttBroker = process.env.MQTTBROKER;

const client = MQTT.connect(mqttBroker);

client.on('connect',()=>{
    run();
})


client.on('message',(topic,buffer)=>{
    let obj = JSON.parse(buffer)
    
    console.log(`=======================================================================`)
    if (obj.subscriptionId){
        let op = { message:obj.message.text,
            buildNumber: obj.resource.buildNumber,
            result: obj.resource.result,
            status: obj.resource.status,
            startTime: obj.resource.startTime,
            endTime: obj.resource.endTime,
        }
        console.log(`[${topic}]  ${beautify(op,null,2,80)}`);
    } else {
        console.log(`[${topic}] ${beautify(obj,null,2,80)}`)
    }
})
 
async function run() {
    let sub = client.subscribe('#');
}
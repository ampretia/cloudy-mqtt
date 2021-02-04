const env = require('env-var');
const MQTT = require("async-mqtt");
const fs = require('fs');
const path = require('path');

let host = env.get("BROKER").required().asUrlString();
let topic = env.get("TOPIC").required().asString();
let retain = env.get("RETAINED").required().asBool();
let payload='';

let payloadFile = path.resolve( env.get("PAYLOAD").required().asString());
if (fs.existsSync(payloadFile)){
    payload = fs.readFileSync(payloadFile)
    run();
} else {
    console.log(`Failed to read file ${payloadFile}`);
    process.exit(1);
}

async function run() {

    console.log(`Connecting to ${host}`);
    const client = await MQTT.connectAsync(host)
   
    try {
        console.log(`Publishing payload to topic ${topic}`);
        await client.publish(topic, payload, {retain});
        // This line doesn't run until the server responds to the publish

        await client.end();
        // This line doesn't run until the client has disconnected without error

        console.log("Done");
    } catch (e) {
        // Do something about it!
        console.log(e.stack);
        process.exit(1);
    }
}

const MQTT = require("async-mqtt");
const env = require('env-var');

let host = env.get("BROKER").required().asUrlString();
let topic = env.get("TOPIC").required().asString();

run()

async function run() {
    console.log(`Connecting to ${host}`);
    const client = await MQTT.connectAsync(host)

    console.log("Starting");
    try {
        await client.subscribe(`#`);
        client.on("message",(topic,buffer)=>{
            let payload = buffer.toString();
            console.log(`${topic}::${payload}`);
        })
    } catch (e) {
        // Do something about it!
        console.log(e.stack);
        process.exit();
    }


}

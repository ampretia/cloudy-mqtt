const MQTT = require("async-mqtt");

run()

let brokerHost = process.env("BROKER");
let tcpPort = process.env("TCPPORT");
let topic = process.env("TOPIC");

async function run() {
    const client = await MQTT.connectAsync("tcp://158.175.84.118:32000")

    console.log("Starting");
    try {
        await client.publish("wow/so/cool", "It works!");
        // This line doesn't run until the server responds to the publish
        await client.end();
        // This line doesn't run until the client has disconnected without error
        console.log("Done");
    } catch (e) {
        // Do something about it!
        console.log(e.stack);
        process.exit();
    }
}

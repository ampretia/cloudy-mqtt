const MQTT = require("async-mqtt");
 

let mqttBroker = process.env.MQTTBROKER;

run()
 
async function run() {
  const client = await MQTT.connectAsync(mqttBroker)
 
  console.log("Starting");
    try {
        await client.publish("wow/so/cool", "It works!");
        // This line doesn't run until the server responds to the publish
        await client.end();
        // This line doesn't run until the client has disconnected without error
        console.log("Done");
    } catch (e){
        // Do something about it!
        console.log(e.stack);
        process.exit();
    }
}
const MQTT = require("async-mqtt");

run()

async function run() {
    const client = await MQTT.connectAsync("tcp://158.175.84.118:32000")

    console.log("Starting");
    try {
        await client.subscribe("wow/so/cool", "It works!");
        client.on("message",(topic,buffer)=>{
            console.log(`${topic}::${buffer.toString()}`);
        })
    } catch (e) {
        // Do something about it!
        console.log(e.stack);
        process.exit();
    }


}

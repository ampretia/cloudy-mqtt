var express = require('express');
var router = express.Router();
const env = require('env-var');

const MQTT = require("async-mqtt");
 

let mqttBroker = env.get("BROKER").required().asUrlString();

const client = MQTT.connect(mqttBroker);

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

/* POST  */
router.post('/*', asyncMiddleware(
  async (req, res, next) => {
    let topic = `/${req.params['0']}`;
    
    await client.publish(topic,JSON.stringify(req.body));
    res.send(`sending on ${topic}`);

  }
));

module.exports = router;

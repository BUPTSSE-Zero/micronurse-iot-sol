if(hub_shared.mqtt_client){
  hub_shared.mqtt_client.end();
  hub_shared.mqtt_client = undefined;
}
done();
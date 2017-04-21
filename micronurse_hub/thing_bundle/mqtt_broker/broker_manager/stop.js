if(shared.broker_manager.mqtt_client){
  shared.broker_manager.mqtt_client.end();
  shared.broker_manager.mqtt_client = null;
}
done();
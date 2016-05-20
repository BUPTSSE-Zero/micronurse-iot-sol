shared.account.stop();
if(hub_shared.token) {
  var logout = require('../logout');
  logout.logout(hub_shared.phone_number, hub_shared.token, hub_shared.sessionid,
    function () {
      console.log('Logout success.');
    }, function () {
      console.log('Logout failed.');
    });
  hub_shared.token = undefined;
  hub_shared.sessionid = undefined;
  hub_shared.nickname = undefined;
  hub_shared.phone_number = undefined;
}
done();

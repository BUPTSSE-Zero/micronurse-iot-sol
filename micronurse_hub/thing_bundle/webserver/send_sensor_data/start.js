/**
 * Created by shengyun-zhou on 5/8/16.
 */
console.log('Micro nurse hub - send sensor data init');

login = require('./login');
login.login(shared, CONFIG.user_phone_num, CONFIG.password,
    function (status_code, result_code, msg) {
    done();
},  function (status_code, result_code, msg) {
    fail('Login Failed.' + msg);
});

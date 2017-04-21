/**
 * Created by shengyun-zhou on 5/19/16.
 */
var qrcode = require('qrcode');

export default class AccountWidget extends Widget {
  $qr_code_str = null;

  componentDidMount() {
    super.componentDidMount();
    this.init_widget();
  }

  componentDidUpdate() {
    this.init_widget();
  }

  init_widget(){
    if(this.$qr_code_str) {
      qrcode.toCanvas(this.refs.qrcode_canvas, this.$qr_code_str, function (error) {
        if (error)
          console.error(error);
      });
    }
  }

  render() {
    var w = this.props.widget;
    var data = this.get_data();
    var table_style = {width: this.get_width()};
    var text_style = {margin: 5};
    var img_style = {width: 128, height: 128, margin: 20};
    var action_result = null;
    this.$qr_code_str = null;

    if (_.isArray(data) && data.length > 0) {
      try {
        action_result = JSON.parse(data[0].action_result);
      }catch(e){
        action_result = null;
      }
    }

    if (w.config.font_size) {
      table_style.fontSize = w.config.font_size;
      text_style.fontSize = w.config.font_size;
    }

    if (w.config.img_size){
      img_style.width = img_style.height = w.config.img_size;
    }

    if (w.config.align) {
      if (w.config.align === 'center'){
        table_style.textAlign = 'center'
      }else if(w.config.align === 'left'){
        table_style.textAlign = 'left';
      }else{
        table_style.textAlign = 'right';
      }
    }

    if(!action_result)
      return super.render(
        <table style={table_style}>
          <tr>
            <td>
              <img style={img_style} src="images/micronurse/logo.png"/>
            </td>
          </tr>
          <tr>
            <td style={text_style}>
              正在获取登录信息……
            </td>
          </tr>
        </table>
      );
    if(action_result.action === 'logout' || (action_result.action === 'login' && action_result.result_code !== 0)) {
      var message = '';
      if(action_result && action_result.message) {
          message = action_result.message;
      }
      var message_td = <td/>;
      if(message.length > 0) {
        message_td =
          <td style={text_style}>
            <span style={{color: 'red'}}>
              {message}
            </span>
          </td>
      }
      this.$qr_code_str = JSON.stringify({
        action: 'iot_login',
        token: action_result.token
      });
      return super.render(
        <table style={table_style}>
          <tr>
            <td>
              <canvas style={img_style} ref="qrcode_canvas"/>
            </td>
          </tr>
          <tr>
            {message_td}
          </tr>
          <tr>
            <td style={text_style}>
              请在手机应用内扫描二维码登录
            </td>
          </tr>
        </table>
      );
    }else if(action_result.action === 'login' && action_result.result_code === 0){
      img_style.borderRadius = '50%';
      return super.render(
        <table style={table_style}>
          <tr>
            <td>
              <img style={img_style} src={'data:image/png;base64,' + action_result.user.portrait}/>
            </td>
          </tr>
          <tr>
            <td style={text_style}>
              {'欢迎您，' + action_result.user.nickname}
            </td>
          </tr>
          <tr>
            <td style={text_style}>
              若要注销账号，请通过手机应用内的应用设置注销
            </td>
          </tr>
        </table>
      );
    }
  }
}
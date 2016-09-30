/**
 * Created by shengyun-zhou on 5/19/16.
 */

export default class AccountWidget extends Widget {
  $phone_number = '';
  $password = '';
  $is_login = false;

  _login(){
    var outdata = JSON.stringify({
      action: 'login',
      phone_number: this.$phone_number,
      password: this.$password
    });
    this.send_data({
      action: outdata
    });
  }

  _on_login_phone_number_change(e){
    if (this.$phone_number !== e.target.value) {
      this.$phone_number = e.target.value;
    }
  }

  _on_login_password_change(e){
    if (this.$password !== e.target.value) {
      this.$password = e.target.value;
    }
  }

  _on_login_key_down(e) {
    if (e.keyCode === 13) {   // enter
      this._login();
    }
  }

  _on_login_button_click(e) {
    e.stopPropagation();
    this._login();
  }

  _on_logout_button_click(e) {
    e.stopPropagation();
    var outdata = JSON.stringify({
      action: 'logout',
    });
    this.send_data({
      action: outdata
    });
  }

  /*_remove_key_listener(){
    this.refs.input_phone_number.removeEventListener("keydown",
      this._on_key_down);
    this.refs.input_password.removeEventListener("keydown",
      this._on_key_down);
  }

  componentDidMount() {
    super.componentDidMount();
    if(!this.$is_login) {
      this.refs.input_phone_number.addEventListener("keydown",
        this._on_login_key_down);
      this.refs.input_password.addEventListener("keydown",
        this._on_login_key_down);
    }
  }

  componentWillUnmount() {
    if(!this.$is_login) {
      this._remove_key_listener();
    }
    super.componentWillUnmount();
  }*/

  render() {
    var w = this.props.widget;
    var data = this.get_data();
    var table_style = {height: this.get_height()};
    var text_style = {paddingLeft: 12, paddingRight: 12};
    var edit_box_style = {paddingTop: 4, paddingBottom: 4};
    var button_style = {paddingLeft: 30, paddingRight: 30};
    var action_result = null;

    if (_.isArray(data) && data.length > 0) {
      try {
        action_result = JSON.parse(data[0].action_result);
      }catch(e){
        action_result = null;
      }
    }

    if (w.config.font_size) {
      table_style.fontSize = w.config.font_size;
      edit_box_style.fontSize = w.config.font_size;
      button_style.fontSize = w.config.font_size;
    }

    if (w.config.align) {
      if (w.config.align == 'center'){
        table_style.margin = 'auto'
      }else if(w.config.align == 'left'){
        table_style.marginRight = 'auto';
      }else{
        table_style.marginLeft = 'auto';
      }
    }

    if(!action_result || action_result.action === 'logout' || (action_result.action === 'login' && action_result.result_code !== 0)) {
      var message = '';
      if(action_result && action_result.message) {
          message = action_result.message;
      }
      var message_td = <td></td>;
      if(message.length > 0) {
        message_td =
          <td style={text_style}>
            <span style={{color: 'red'}}>
              {message}
            </span>
          </td>
      }
      return super.render(
        <form>
          <table style={table_style}>
            <tr>
              <td style={text_style}>
                手机号:
              </td>
              <td>
                <input type="text" ref="input_phone_number" className="form-control" style={edit_box_style}
                       onChange={this._on_login_phone_number_change}/>
              </td>
              <td style={text_style}>
                密码:
              </td>
              <td>
                <input type="password" ref="input_password" className="form-control" style={edit_box_style}
                       onChange={this._on_login_password_change}/>
              </td>
              <td style={text_style}>
                <div className="btn btn-primary" style={button_style}
                     onClick={this._on_login_button_click}>
                  登 录
                </div>
              </td>
              {message_td}
            </tr>
          </table>
        </form>
      );
    }else if(action_result.action === 'login' && action_result.result_code === 0){
      return super.render(
        <table style={table_style}>
          <tr>
            <td style={text_style}>
              {"欢迎您，" + action_result.nickname}
            </td>
            <td style={text_style}>
              <div className="btn btn-danger" style={button_style}
                   onClick={this._on_logout_button_click}>
                注 销
              </div>
            </td>
          </tr>
        </table>
      );
    }
  }
}
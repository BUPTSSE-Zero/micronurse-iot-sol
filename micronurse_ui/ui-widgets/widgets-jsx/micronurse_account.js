/**
 * Created by shengyun-zhou on 5/19/16.
 */

export default class AccountWidget extends Widget {

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
        action_result = data.map((t, i) => JSON.parse(t.action_result));
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

    if(!action_result || action_result.action == 'logout' || (action_result.action == 'login' && action_result.result_code !== 0)) {
      var message = '';
      if(action_result && action_result.action == 'login') {
          message = action_result.message;
      }
      return super.render(
        <form>
          <table style={table_style}>
            <tr>
              <td style={text_style}>
                手机号:
              </td>
              <td>
                <input type="text" className="form-control" style={edit_box_style}/>
              </td>
              <td style={text_style}>
                密码:
              </td>
              <td>
                <input type="password" className="form-control" style={edit_box_style}/>
              </td>
              <td style={text_style}>
                <div
                  className="btn btn-primary" style={button_style}>
                  登 录
                </div>
              </td>
            </tr>
          </table>
        </form>
      );
    }
  }
}
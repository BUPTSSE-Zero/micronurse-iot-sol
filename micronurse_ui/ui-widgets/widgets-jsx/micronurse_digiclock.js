function numFormat(num) {
  if(num < 10)
      return '0' + num;
  return num;
}

function toDateString(timestamp){
  var date = new Date(timestamp);
  var Y = date.getFullYear();
  var M = numFormat(date.getMonth() + 1);
  var D = numFormat(date.getDate());
  return Y + '-' + M + '-' + D;
}

function toTimeString(timestamp) {
  var date = new Date(timestamp);
  var h = numFormat(date.getHours());
  var m = numFormat(date.getMinutes());
  var s = numFormat(date.getSeconds());
  return h + ':' + m + ':' + s;
}

export default class Digiclock extends Widget {

  render() {
    var w = this.props.widget;
    var data = this.get_data();
    var tablestyle = {};
    var date_text_style = {};
    var time_text_style = {};
    var clock_svg_style = {display: 'none'};
    var clock_svg = 'images/micronurse/clock.svg';
    var text;
    var date_str;
    var time_str;

    if (_.isArray(data) && data.length > 0) {
      text = data.map((t, i) => String(t.time));
      date_str = data.map((t, i) => toDateString(t.time));
      time_str = data.map((t, i) => toTimeString(t.time));
    }

    date_text_style.fontWeight = w.config.date_font_weight;
    if(w.config.date_font_size) {
      date_text_style.fontSize = w.config.date_font_size;
    }

    time_text_style.fontWeight = w.config.time_font_weight;
    if(w.config.time_font_size) {
      time_text_style.fontSize = w.config.time_font_size;
    }

    if(w.config.align) {
      if (w.config.align == 'center'){
        tablestyle.margin = 'auto'
      }else if(w.config.align == 'left'){
        tablestyle.marginRight = 'auto';
      }else{
        tablestyle.marginLeft = 'auto';
      }
    }

    if(w.config.icon === true){
      clock_svg_style.display = 'block';
      clock_svg_style.height = w.config.icon_size;
    }

    tablestyle.height = this.get_height();

    if(w.config.orientation == 'vertical') {
      return super.render(
        <table style={tablestyle}>
          <tr>
            <td>
              <img src={clock_svg} style={clock_svg_style}/>
            </td>
            <td>
              <table>
                <tr>
                  <td>
                    <span style={date_text_style}>{date_str}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={time_text_style}>{time_str}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      );
    }else{
      tablestyle.lineHeight = this.get_height() + 'px';
      return super.render(
          <table style={tablestyle}>
            <tr>
              <td>
                <img src={clock_svg} style={clock_svg_style}/>
              </td>
              <td>
                <span style={date_text_style}>{date_str}&nbsp;</span>
              </td>
              <td>
                <span style={time_text_style}>{time_str}</span>
              </td>
            </tr>
          </table>
      );
    }
  }
}



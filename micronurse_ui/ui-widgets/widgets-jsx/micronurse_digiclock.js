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
    var divstyle = {};
    var date_text_style = {};
    var time_text_style = {fontWeight: 'bold'};
    var text;
    var date_str;
    var time_str;

    if (_.isArray(data) && data.length > 0) {
      text = data.map((t, i) => String(t.time));
      date_str = data.map((t, i) => toDateString(t.time));
      time_str = data.map((t, i) => toTimeString(t.time));
    }

    if(w.config.date_font_size) {
      date_text_style.fontSize = w.config.date_font_size;
    }

    if(w.config.time_font_size) {
      time_text_style.fontSize = w.config.time_font_size;
    }

    if(w.config.align) {
      divstyle.textAlign = w.config.align;
    }

    return super.render(
      <div style={divstyle}>
        <div style={date_text_style}>{date_str}</div>
        <div style={time_text_style}>{time_str}</div>
      </div>
    );
  }
}



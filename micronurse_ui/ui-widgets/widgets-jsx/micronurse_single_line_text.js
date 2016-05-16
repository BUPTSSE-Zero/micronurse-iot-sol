export default class TextWidget extends Widget {

  render() {
    var w = this.props.widget;
    var data = this.get_data();
    var style = {};
    var text;

    if (_.isArray(data) && data.length > 0) {
      text = data.map((t, i) => String(t.text));
    }
    else if ("defval" in w.config) {
      text = w.config.defval;
    }

    if (w.config.font_size) {
      style.fontSize = w.config.font_size;
    }
    style.textAlign = w.config.align;
    style.fontWeight = w.config.font_weight;
    style.lineHeight = this.get_height() + 'px';

    return super.render(
      <div style={style}>{text}</div>
    );
  }
}



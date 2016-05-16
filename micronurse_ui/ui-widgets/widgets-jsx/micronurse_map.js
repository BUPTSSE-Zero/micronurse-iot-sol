function checkPos(pos){
    var items = pos.split(',');
    if(!_.isArray(items) || items.length != 2)
        return false;
    var longitude = parseFloat(items[0]);
    var latitude = parseFloat(items[1]);
    console.log('longtitue:' + longitude + ' latitude:' + latitude);
    if(isNaN(longitude) || longitude < 0 || longitude > 180)
        return false;
    if(isNaN(latitude) || latitude < -90 || latitude > 90)
        return false;
    return true;
}

export default class MapWidget extends Widget {

    render() {
        var w = this.props.widget;
        var data = this.get_data();
        var pos = '116.381493,40.114757';
        var ak = null;
        var zoom = 13;

        this.set_css('mymap',
            '#bmap{width:100%;height:100%}'
        );

        if (_.isArray(data) && data.length > 0) {
            pos = data[0].position;
        }

        if(w.config.ak) {
            ak = w.config.ak;
        }

        if(w.config.zoom){
            zoom = w.config.zoom;
            if(zoom < 3)
                zoom = 3;
            else if(zoom > 18)
                zoom = 18;
        }

        if(ak == null) {
            var no_map_style = {fontWeight: 'bold', fontSize: 40, textAlign: 'center', lineHeight: this.get_height() + 'px'};
            return super.render(
                <div style={no_map_style}>
                    No Map
                </div>
            );
        }

        if(!checkPos(pos))
            pos = null;

        if(pos == null){
            var pos_invalid_style = {fontWeight: 'bold', fontSize: 40, textAlign: 'center', lineHeight: this.get_height() + 'px'};
            return super.render(
                <div style={pos_invalid_style}>
                    Invalid Position
                </div>
            );
        }

        var bmap_src = 'http://api.map.baidu.com/staticimage/v2?ak=' + ak +
                       '&center=' + pos +
                       '&zoom=' + zoom +
                       '&scale=1.5' +
                       '&width=' + this.get_width() +
                       '&height=' + this.get_height() +
                       '&markers=' + pos +
                       '&markerStyles=m,'
        return super.render(
            <img id="bmap" src={bmap_src}/>
        );
    }
}

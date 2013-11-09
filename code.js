
var map;

function init() {
    Proj4js.defs["EPSG:3067"] = "+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs";

    var projection = ol.proj.configureProj4jsProjection({
      code: 'EPSG:3067', units: ol.proj.Units.METERS,
      extent: [50199.4814, 6582464.0358, 761274.6247, 7799839.8902]
    });

    ol.proj.addProjection(projection);

    var extent = [50199.4814, 6582464.0358, 761274.6247, 7799839.8902];

    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Image({
                source: new ol.source.ImageWMS({
                  url: 'http://tiles.kartat.kapsi.fi/taustakartta?',
                  crossOrigin: 'anonymous',
                  attributions: [new ol.Attribution({
                    html: '&copy; ' +
                        '<a href="http://www.maanmittauslaitos.fi/avoindata_lisenssi_versio1_20120501' +
                        'en/home.html"> Maanmittauslaitos</a>'
                  })],
                  params: {'LAYERS': 'taustakartta'},
                  extent: extent
                })
              })
        ],
        view: new ol.View2D({
          center: [257950.93897922945, 6871557.060772844], zoom: 8, projection: projection
        }),
        renderer: ol.RendererHint.CANVAS
    });

    // Some test URLs
    //var url = 'http://hip.latuviitta.org/cgi-bin/tinyows?service=wfs&version=1.0.0&request=getfeature&typename=lv:nba_mjreki_inspire_alue&maxfeatures=300';

    var url = 'http://hip.latuviitta.org/cgi-bin/tinyows?service=wfs&version=1.0.0&maxfeatures=100&request=getfeature&typename=lv:peltolohkot_2013';
    //var url = 'http://hip.latuviitta.org/cgi-bin/tinyows?service=wfs&version=1.0.0&maxfeatures=100&request=getfeature&typename=lv:pks_suuralue';

    addLayer(url);
}

function addLayer(url) {
    var proxyurl = '/cgi-bin/proxy.cgi?url=' + encodeURIComponent(url);
    
    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        parser: new ol.parser.ogc.GML_v2(),
        url: proxyurl
      }),
      style: new ol.style.Style({
        symbolizers: [
          new ol.style.Fill({
            color: '#FF1A1A',
            opacity: 0.5
          }),
          new ol.style.Stroke({
            color: '#FF1A1A'
          })
        ]
      })
    });

    map.addLayer(layer);
}

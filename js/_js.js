$(function () {

    var menuItemPosTop = $('.hrefTarget');
    menuItemPosTop.scrollPagePlugin();



    var lat = 51.842276;
    var lng = 18.061754;


    var autoSerwisLokalizacja = new ol.proj.transform([lng, lat], "EPSG:4326", "EPSG:3857");

    var serwis = new ol.Feature({
        geometry: new ol.geom.Point(autoSerwisLokalizacja)
    });

    var marker = new ol.layer.Vector({
        zIndex: 8,
        source: new ol.source.Vector({
            features: [serwis]
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/marker.svg',
                scale: .3,
                imgSize: [172, 133], anchor: [0.0, .75]

            })
        })

    });
    console.log(marker.getSource().getFeatures());

    var map = new ol.Map({
        view: new ol.View({
            center: autoSerwisLokalizacja,
            zoom: 14
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'map'
    });
    map.addLayer(marker);
});

$.fn.scrollPagePlugin = function () {

    $(this).on('click', function () {
        var menuItemPosTop = $($(this).attr('href')).offset().top;
        $('html, body').animate({
            scrollTop: menuItemPosTop
        }, 800);
    });
    return this;
};


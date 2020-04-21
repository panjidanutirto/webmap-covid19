$(document).ready(function() {
  $("#introModal").modal("show");
});

function tampilkanCovid() {
          $.getJSON('https://api.kawalcorona.com/indonesia/provinsi/', function (data) {
             $.each(data, function (i, data) {
             $('#list-covid').append('<tr><td>'+ data.attributes.Provinsi +'</td><td class="text-center">'+ data.attributes.Kasus_Posi +'</td><td class="text-center">'+ data.attributes.Kasus_Semb +'</td><td class="text-center">'+ data.attributes.Kasus_Meni +'</td></tr>');
          });
        });
      }
tampilkanCovid();

var map = new L.Map('map', {
                zoomControl: false,
                attribution: true,
                continuousWorld: true
            });
            map.setView(new L.LatLng(-2.53, 117.33),3);

var esristreets = L.esri.basemapLayer('Streets').addTo(map);
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>';
var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 18, attribution: osmAttrib});

var COVID19_Indonesia_per_Provinsi = L.esri.Cluster.featureLayer({
    url: 'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/ArcGIS/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0'
}).bindPopup(function (layer) {
   return "Provinsi :&nbsp;<b>" + layer.feature.properties.Provinsi + "</b><br>" +
          "Kasus Positif :&nbsp;<b>" + layer.feature.properties.Kasus_Posi + "</b><br>" +
          "Kasus Sembuh :&nbsp;<b>" + layer.feature.properties.Kasus_Semb + "</b><br>" +
          "Kasus Meninggal :&nbsp;<b>" + layer.feature.properties.Kasus_Meni + "</b>";
}).addTo(map);

map.addControl(new L.Control.Fullscreen({
          title: {
            'false': 'View Fullscreen',
            'true': 'Exit Fullscreen'
            }
      }));

var zoom_bar = new L.Control.ZoomBar({position: 'topright'}).addTo(map);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

function switchView(view) {
  if (view == "split") {
    $("#view").html("Split View");
    location.hash = "#split";
    $("#table-container").show();
    $("#table-container").css("height", "55%");
    $("#map-container").show();
    $("#map-container").css("height", "45%");
    $(window).resize();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "table") {
    $("#view").html("Table View");
    location.hash = "#table";
    $("#table-container").show();
    $("#table-container").css("height", "100%");
    $("#map-container").hide();
    $(window).resize();
  }
}

$("[name='view']").click(function() {
  $(".in,.open").removeClass("in open");
  if (this.id === "map-graph") {
    switchView("split");
    return false;
  } else if (this.id === "graph-only") {
    switchView("table");
    return false;
  }
});
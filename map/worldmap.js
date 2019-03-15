// countries data from: https://datahub.io/core/geo-countries#data

const width = window.innerWidth;
const height = 923; // setting the height that of not to the window allos for all of Australia to be seen
const hover = "#fff6ae"; // color value when hovering
const norm = "#ffaec1"; // normal fille value of a country
const selectE = "#aed2ff"; // color value of a country with an export rate
const selectI = "#e9ffae"; // color value of a contry with an import rate
const msg = "N/A";

var projection = d3.geoMercator()
    .translate([width / 2.2, height / 1.5]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("#wrapper")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "map");

var g = svg.append("g")
    .attr("style", "border: 1px solid black; padding: 0px; margin: 0px;");

function colorCountry(country) {
    if(pEXPORTCOUNT.includes(country)) {
	return selectE;
    } else if (pIMPORTCOUNT.includes(country)) {
	return selectI;
    } else {
	return norm;
    }
}

function pEXPORTVAL(country) {
    var val = pEXPORT[country];
    if(val == undefined) {
	return msg;
    } else {
	return val;
    }
}

function pIMPORTVAL(country) {
    var val = pIMPORT[country];
    if(val == undefined) {
	return msg;
    } else {
	return val;
    }
}

g.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", function(d) {return colorCountry(d.properties.ADMIN)})
    .on("mouseover", function(d)
	{d3.select("#popup")
		.style("left", (d3.event.pageX + 5) + "px")
		.style("top", (d3.event.pageY + 5) + "px")
		.style("opacity", 1)
		.text(d.properties.ADMIN + ", Export: " + pEXPORTVAL(d.properties.ADMIN) +
		      ", Import: " + pIMPORTVAL(d.properties.ADMIN));
	    d3.select(this).attr("fill", hover);})
    .on("mouseout", function(d)
	{d3.select(this).attr("fill", colorCountry(d.properties.ADMIN));});

"use strict";

var seletedStateDisplay = document.getElementById('seletedStateDisplay');
var stateSelectMenu = document.getElementById('stateSelectMenu');

stateSelectMenu.addEventListener('change', testFunction);

function testFunction(event){
    console.log(stateSelectMenu.options[stateSelectMenu.selectedIndex].value);
    //this needs to tie into the existing click
}

function addAccessor(f, e, d) {
    f[e] = function(c) {
        return "undefined" == typeof c ? f.properties[e] || d : (f.properties[e] = c, f)
    }
}

function _classCallCheck(f, e) {
    if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _classCallCheck(f, e) {
    if (!(f instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _inherits(f, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    f.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: f,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(f, e) : f.__proto__ = e)
}
var _createClass = function() {
        function f(f, e) {
            for (var d = 0; d < e.length; d++) {
                var c = e[d];
                c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(f, c.key, c)
            }
        }
        return function(e, d, c) {
            return d && f(e.prototype, d), c && f(e, c), e
        }
    }(),
    Geomap = function() {
        function f() {
            _classCallCheck(this, f), this.properties = {
                geofile: null,
                height: null,
                postUpdate: null,
                projection: d3.geo.naturalEarth,
                rotate: [0, 0, 0],
                scale: null,
                translate: null,
                unitId: "iso3",
                unitPrefix: "usState-",
                units: "units",
                unitTitle: function(f) {
                    return f.properties.name
                },
                width: null,
                zoomFactor: 1
            };
            for (var e in this.properties) addAccessor(this, e, this.properties[e]);
            this._ = {}
        }
        return _createClass(f, [{
            key: "clicked",
            value: function(f) {
                var e = this,
                    d = 1,
                    c = this.properties.width / 2,
                    a = this.properties.height / 2,
                    b = c,
                    t = a;
                if (f && f.hasOwnProperty("geometry") && this._.centered !== f) {
                    var r = this.path.centroid(f);
                    b = r[0], t = r[1], d = this.properties.zoomFactor, this._.centered = f
                } else 
                this._.centered = null;

                this.svg.selectAll("path.usState").classed("activeState", this._.centered && function(f) {
                    return f === e._.centered
                })

                //click function here
                //,this.svg.selectAll("g.zoom").transition().duration(750).attr("transform", "translate(" + c + ", " + a + ")scale(" + d + ")translate(-" + b + ", -" + t + ")")
                //console.log(event.currentTarget)
                seletedStateDisplay.innerHTML = event.currentTarget.getAttribute('data-stateName');
                console.log(seletedStateDisplay.innerHTML);

                //this should also update the select menu selection
                
            }
        }, {
            key: "draw",
            value: function(f, e) {

                

                e.properties.width || (e.properties.width = 480), 
                e.properties.height || (e.properties.height = 300), 
                e.properties.scale || (e.properties.scale = e.properties.width / 5.8), 
                e.properties.translate || (e.properties.translate = [
                    e.properties.width / 2,
                    e.properties.height / 2
                ]),
                e.svg = f.append("svg")
                    .attr("width", e.properties.width)
                    .attr("height", e.properties.height), 
                e.svg.append("rect")
                    .attr("class", "iftMap__svg__rect--background")
                    .attr("width", e.properties.width)
                    .attr("height", e.properties.height)
                ;

                var d = e.properties.projection()
                    .scale(e.properties.scale)
                    .translate(e.properties.translate)
                    .precision(.1);

                d.hasOwnProperty("rotate") && e.properties.rotate && d.rotate(e.properties.rotate),
                e.path = d3.geo.path().projection(d),
                
                d3.json(e.properties.geofile, function(f, d) {
                    e.geo = d,
                    e.svg.append("g")
                    .attr("class", "iftMap__svg__g")
                    .selectAll("path")
                    .data(topojson.feature(d, d.objects[e.properties.units])
                        .features)
                    .enter()
                    .append("path")
                    .attr("class", function(f) {
                        return "usState iftMap__svg__path " + e.properties.unitPrefix + f.id
                    }).attr("data-stateName", function(f){
                        return f.properties.name
                    }).attr("data-stateCode", function(f){
                        return f.id;
                    }).attr("data-stateID", function(f){
                        var theIDtoClean = f.id;
                        //remove string to get pure digits
                        var theCleanID = theIDtoClean.replace(/\D/g,'');
                        return theCleanID;
                    }).attr("d", e.path)
                    //trying to modularize this function
                    //if I populate the titles differently
                    .on("click", e.clicked.bind(e))
                    .append("title")
                    .text(e.properties.unitTitle),
                    
                    e.update()
                })
                //end d3.json


                function dataBindFunction(e){
                    e.clicked.bind(e);
                    console.log('clicked');
                    //stateSelectMenu.value = 'DC';
                }
            }
        }, {
            key: "update",
            value: function() {
                this.properties.postUpdate && this.properties.postUpdate()
            }
        }]), f
    }();
d3.geomap = function() {
    return new Geomap
};
var _createClass = function() {
        function f(f, e) {
            for (var d = 0; d < e.length; d++) {
                var c = e[d];
                c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(f, c.key, c)
            }
        }
        return function(e, d, c) {
            return d && f(e.prototype, d), c && f(e, c), e
        }
    }(),
    _get = function(f, e, d) {
        for (var c = !0; c;) {
            var a = f,
                b = e,
                t = d;
            c = !1, null === a && (a = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(a, b);
            if (void 0 !== r) {
                if ("value" in r) return r.value;
                var n = r.get;
                return void 0 === n ? void 0 : n.call(t)
            }
            var i = Object.getPrototypeOf(a);
            if (null === i) return void 0;
            f = i, e = b, d = t, c = !0, r = i = void 0
        }
    },
    Choropleth = function(f) {
        function e() {
            _classCallCheck(this, e), _get(Object.getPrototypeOf(e.prototype), "constructor", this).call(this);
            var f = {
                colors: '#000',
                column: null,
                domain: null,
                duration: null,
                format: d3.format(",.02f"),
                legend: !1,
                valueScale: d3.scale.quantize
            };
            for (var d in f) this.properties[d] = f[d], addAccessor(this, d, f[d])
        }
        return _inherits(e, f), _createClass(e, [{
            key: "columnVal",
            value: function(f) {
                return +f[this.properties.column]
            }
        }, {
            key: "draw",
            value: function(f, d) {
                d.data = f.datum(), _get(Object.getPrototypeOf(e.prototype), "draw", this).call(this, f, d)
            }
        }, {
            key: "defined",
            value: function(f) {
                return !(isNaN(f) || "undefined" == typeof f || "" === f)
            }
        }, {
            key: "update",
            value: function() {
                var f = this;
                f.extent = d3.extent(f.data, f.columnVal.bind(f)),
                f.colorScale = f.properties.valueScale().domain(f.properties.domain || f.extent).range(f.properties.colors), f.svg.selectAll("path.usState").style("fill", null), f.data.forEach(function(e) {
                    var d = e[f.properties.unitId].trim(),
                        c = e[f.properties.column].trim(),
                        a = f.svg.selectAll("." + f.properties.unitPrefix + d);
                    if (!a.empty() && f.defined(c)) {
                        var b = f.colorScale(c),
                            t = f.properties.unitTitle(a.datum());
                        f.properties.duration ? a.transition().duration(f.properties.duration).style("fill", b) : a.style("fill", b), c = f.properties.format(c), a.select("title").text(t + "\n\n" + f.properties.column + ": " + c)
                    }
                })
            }
        }

        ]), e
    }
    (Geomap);

d3.geomap.choropleth = function() {return new Choropleth};


var map = d3.geomap.choropleth()
    .geofile('https://d3-geomap.github.io/d3-geomap/topojson/countries/USA.json')
    .projection(d3.geo.albersUsa)
    .column('StateAbbr')
    .unitId('fips')
    .scale(600)
    .zoomFactor(1)
    .legend(false);

    d3.csv('/javascripts/data/dataFile.csv', 
        function(error, data) {
            d3.select('#iftMap')
                .datum(data)
                .call(map.draw, map);
        })
    ;
;
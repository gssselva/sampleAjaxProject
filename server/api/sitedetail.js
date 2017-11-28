'use strict';

var logger = require('powwow-server-common').logger;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.sitedetil = function (page) {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/api/values";
    var list = [];
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (var i = 0; i < response.length; i++) {
                list[i] = {'title': response[i].title,'Value':response[i].value,'Measure':response[i].mesure};
            }
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();

    page.data(function(data) {
        data.list = list;
    })
        .screen("sitedetail");
}


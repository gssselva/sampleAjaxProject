'use strict';

var logger = require('powwow-server-common').logger;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.on_displayresult = function (page) {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://jsonplaceholder.typicode.com/users";
    var list = [];
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (var i = 0; i < response.length; i++) {
                list[i] = {'name': response[i].name,'email':response[i].email,'phone':response[i].phone,'username':response[i].username,'website':response[i].website};
            }
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();

    page.data(function(data) {
        data.list = list;
    })
        .screen("result");
}

exports.resultdetails = function(page, param) {
    // the details rest call will go here
    page.data(function(data) {
        data.sitedetails = 'Name  : ' + param.name;
        data.username = 'Username : ' + param.username;
        data.email = 'Email : ' + param.email;
        data.phone = 'Phone : ' + param.phone;
        data.website = 'Website :' + param.website;
    })
        .screen('details');
}
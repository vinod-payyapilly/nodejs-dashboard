const os = require('os');
const express = require('express');
const app = express();
const redis = require('redis');
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

app.get('/', function(req, res) {
    redisClient.lrange('CLIENT_ACCESS_LIST', 0, -1, function(err, access_list) {

        let diplay_table = '<H1>Access List Dashboard</H1>\n';
        diplay_table += '<table border="1" style="border-collapse:collapse;background-color: #CDCDCD">\n';
        diplay_table += "<tr><th>CLIENT IP</th><th>ACCESS DATE</th></tr>\n";
        for(i=0; i < access_list.length; i++){
            let entry = JSON.parse(access_list[i])
            diplay_table += "<tr><td>" + entry["ip"] + "</td><td>" + entry["access_date"] + "</td></tr>\n";
        }
        diplay_table += '</table>\n';
        
        res.send(diplay_table);
    });
});

app.listen(5000, function() {
    console.log('Web application is listening on port 5000');
});

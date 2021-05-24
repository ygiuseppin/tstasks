const promClient = require('prom-client');

const register = promClient.register;
const counters = [];

const defaultTags = {
    appname: 'facenode',
    instanceid: 1
};

register.setDefaultLabels(defaultTags);

class PromClient {
    static counter(name, inc, tags) {
            const counter = counters.find(c => c.name === name);
            if(!counter){
                const newCounter = new promClient.Counter({
                    name,
                    help:'metric_help',
                    labelNames: Object.keys(tags),
                });

                counters.push(newCounter);
                //register.registerMetric(name);
                console.log('inc');
                newCounter.inc(tags, inc);
            } else {
                console.log('inc2');
                counter.inc(tags, inc);
            }
       
    }
}

module.exports = PromClient;
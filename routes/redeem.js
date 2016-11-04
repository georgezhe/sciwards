var rewards = require('../data/rewards.json');
exports.view = function (req, res) {
    console.log("loading the nav bar");
    res.render('redeem_page', rewards);
}

exports.subPoint = function (req, res, next) {
    fs.readFile('data/data.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var profile;
            var obj = JSON.parse(data);
            var inData = 0;
            for (var i = 0; i < obj.table.length; i++) {
                if (req.session.name == obj.table[i].name) {
                    obj.table[i].score -= req.body.rewardprice;
                    profile = obj.table[i];
                }
            }
            var json = JSON.stringify(obj);
            fs.writeFileSync('data/data.json', json);
            console.log("Wrote:" + profile.name + " to file!!!");
            console.log("Score:     " + profile.score);
            res.redirect(req.get('referer'));
        }
    });
}

exports.setGoal = function (req, res, next) {
    fs.readFile('data/data.json', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var profile;
            var obj = JSON.parse(data);
            var inData = 0;
            for (var i = 0; i < obj.table.length; i++) {
                if (req.session.name == obj.table[i].name) {
                    obj.table[i].reward = req.body.reward;
                    profile = obj.table[i];
                }
            }
            var json = JSON.stringify(obj);
            fs.writeFileSync('data/data.json', json);
            console.log("Wrote:" + profile.name + " to file!!!");
            console.log("Score:     " + profile.score);
            res.redirect(req.get('referer'));
        }
    });
}

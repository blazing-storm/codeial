// module.exports.actionName = function(req, res) {}

module.exports.home = function(req, res) {
    // playing with cookies
    console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    return res.render('home', {
        title: "Home"
    });
}
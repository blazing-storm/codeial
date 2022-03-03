// module.exports.actionName = function(req, res) {}

const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res) {
    try {
        // populate the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users
        });
    }
    catch(err) {
        console.log('Error: ', err);
        return;
    }
}

/*
// without async await
module.exports.home = function(req, res) {
    // // playing with cookies
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts) {
    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    //     });
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts) {
        User.find({}, function(err, users) {
            return res.render('home', {
                title: "Home",
                posts: posts,
                all_users: users
            });
        })
    })
}
*/
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        // populating only the username in the post
        post = await post.populate('user', 'name');

        if(req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post created!'
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');
    }
    catch(err) {
        req.flash('error', err);
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        // .id means converting the object id into string
        if(post.user == req.user.id) {
            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post._id, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post deleted!'
                })
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }
        else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    }
    catch(err) {
        // console.log('Error: ', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

/*
// without async await
module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post) {
        if(err) {
            // console.log('Error in creating a post');
            req.flash('error', err);
            return res.redirect('back');
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');
    });
}

module.exports.destroy = function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        // .id means converting the object id into string
        if(post.user == req.user.id) {
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err) {
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    });
}
*/
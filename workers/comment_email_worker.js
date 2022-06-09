const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('comment_emails', function(job, done) {
    console.log('Comment Email Worker is processing a job', job.data);

    commentsMailer.newComment(job.data);

    done();
});
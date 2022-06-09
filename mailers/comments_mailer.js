const nodemailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    // console.log('Inside newComment mailer', comment);

    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        // It always sends the email from the id used for authentication
        // from: 'Mayank <mayankgoyalstar@gmail.com>',
        from: 'Mayank <mayankag365@gmail.com>',
        to: comment.user.email,
        subject: "New Comment Published in Codeial!",
        html: htmlString
        // html: '<h1> Yup, your comment is now published! </h1>'
    }, (err, info) => {
        if(err) { console.log('Error in sending mail', err); return; }

        console.log('Message sent', info);
        return;
    })
}
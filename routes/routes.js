const express = require('express');
const router = express.Router();
const mysql = require('../db/connection.js').con;


router.get('/', (req, res) => {
    res.render('index')
});

router.get('/why-tajurba', (req, res) => {
    res.render('why-tajurba')
});

router.get('/lifeAtTajurba', (req, res) => {
    res.render('lifeAtTajurba') 
});

router.get('/tajurba-history', (req, res) => {
    res.render('tajurba-history')
});

router.get('/about-us', (req, res) => {
    res.render('about-us')
});

router.get('/media', (req, res) => {
    res.render('media')
});

router.get('/our-founders', (req, res) => {
    res.render('our-founders')
});
router.get('/core-team', (req, res) => {
    res.render('core-team')
});
router.get('/upcoming-events', (req, res) => {
    res.render('upcoming-events')
});
router.get('/past-events', (req, res) => {
    res.render('past-events')
});

router.get('/blog/:id', (req, res) => {

    const id = req.params.id

    mysql.query(`SELECT * FROM blogs WHERE id = "${id}" && status = 1 LIMIT 1 `, (err, blogs) => {
        if (err) {
            console.log(err);
        }

        else {

            if (blogs.length < 1) {
                res.send("No blog available")
            }

            mysql.query(`SELECT post_image FROM blogPosts WHERE post_id = "${id}"`, (err, postImages) => {
                if (err) {
                    console.log(err);
                }

                else {
                    res.render('blog', { blogs, postImages });
                }
            });
        }
    })


});

router.get('/contact', (req, res) => {
    res.render('contact')
});
router.get('/member-program', (req, res) => {
    res.render('member-program')
});
router.get('/blogs', (req, res) => {

    mysql.query('SELECT * FROM blogs WHERE status = 1', (err, rows) => {
        if (err) {
            console.log("found error")
        }

        else {
            console.log(rows);
            res.render('blogs', { data: rows });
            // res.json(rows)
        }
    })
});
router.get('/findChapter', (req, res) => {
    res.render('findChapter')
});



router.post('/contact-form-process', (req, res) => {
    const name = req.body.pName;
    const email = req.body.pEmail;
    const phone = req.body.pPhone
    const message = req.body.pMessage;
    console.log(name, email, phone, message);

    // res.send('sending to db');

    // Sanitisation XSS

    // let qry = "select * from user where pName=? or pEmail=? or pPhone=? or pMessage=?";
    // mysql.query(qry, [name, email, phone, message], (err, results) => {
    //     if(err)
    //         throw err
    //     else {
    //         if(results.length > 0){

    //         }
    //         // else{
    //         //     res.send(results)
    //         //     console.log("data submitted")
    //         // }


    //         else{
    //             // insert query 

    mysql.connect((err) => {
        if (err) {
            throw err;
            console.log("NOT CONNECTED")
        }

        else {
            let qry2 = "INSERT INTO user(pName,pEmail,pPhone,pMessage) VALUES('" + name + "','" + email + "','" + phone + "', '" + message + "' )";
            mysql.query(qry2, (err, results) => {

                if (err) {
                    throw err;
                }
                res.render('index');
                console.log(results);
                console.log("Data submitted");
            });

            console.log("connection created..!!");
        }
    });
    //         }
    //     }
    // } )


    // for email  start
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'moin.uniworld@gmail.com',
            pass: 'spaslgiyezgzwuvp'
        }
    })

    var mailOptions = {
        from: 'moin.uniworld@gmail.com',
        to: 'req.body.pEmail',
        cc: 'moin.uniworld@gmail.com',
        subject: 'Thanks for giving feedback ' + name,
        text: 'Thanks for your message ===> ' + message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            // res.send("Thank You")
            console.log("email send" + info.response)
        }
    });

    // for email end
});

router.get('/contact', (req, res) => {
    res.sendFile(rootPath + '/contact.html')
})

router.post('/contact', (req, res) => {
    const name = req.body.pName;
    const subject = req.body.pSubject;
    // const phone = req.body.pPhone
    const message = req.body.message;
    console.log(name, subject, message)

    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'moin.uniworld@gmail.com',
            pass: 'spaslgiyezgzwuvp'
        }
    })

    var mailOptions = {
        from: 'moin.uniworld@gmail.com',
        to: 'req.body.pEmail',
        cc: 'moin.uniworld@gmail.com',
        subject: 'Thanks for giving feedback ' + name,
        text: 'Thanks for your message ===> ' + message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send("Thank You")
            console.log("email send" + info.response)
        }
    })
});


module.exports = router;

exports.sendEmail=function
 (pmail,starttime,endtime){
    var nodemailer = require('nodemailer');
 
    
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cooper.mukesh@rubicotech.in',
        pass: 'Rubico1234@'
      }
    });
    
    var mailOptions = {
      from: 'cooper.mukesh@rubicotech.in',
      to: pmail,
      subject: 'Slot Details',
      text: 'Booking Slot Successfully by'+pmail+'\n'+'your session start from'+starttime+'\n'+'TO'+endtime+'\n'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    }
    
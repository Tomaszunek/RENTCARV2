'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//const passport = require('passport');

const path = require('path');
const url = require('url');
const http = require('http');
const nodemailer = require('nodemailer');
const sessions = require('client-sessions');
const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');



//Models
const models = require('./models');
const cars = require('./routes/cars.js');
const app = express();

app.use(sessions({
  cookieName: 'session',
  secret: 'some_secret_words',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly:true,
  //secure: true,
  ephemeral: true,
}));

function getHostName(){
  return 'http://localhost:3000'; // hostname = 'localhost:8080'
}

function sendMailResetPasswd(adressMail, password){
  var emailSend = adressMail;
  var myMail = '***';

  var resetPassword = '<h1>Your password has been reset!</h1>' +
                      '<p>You can login to service now with new password.</p>' +
                      '<p>Your new password is ' + password +
                      '<p>Thanks for using our service ' + getHostName() + '</p>';

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: myMail,
      pass: '***'
    }
  });

  var mailOptions = {
    from: myMail,
    to: emailSend,
    subject: 'Reset password on domain ' + getHostName(),
    html: resetPassword
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendMailNewUser(adressMail, username){
  var emailSend = adressMail;
  var emailSendUsername = username;
  var myMail = '***';

  var newUser = '<h1>Now you are register ' + emailSendUsername +'!</h1>' +
                '<p>You can login to service now.</p><p>Active your account ' +
                getHostName() + '/api/activeAccount/' + username + '</p>' +
                '<p>Thanks for using our service ' + getHostName() + '</p>';

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: myMail,
      pass: '***'
    }
  });

  var mailOptions = {
    from: myMail,
    to: emailSend,
    subject: 'Thanks for register on ' +  getHostName() + ' service',
    html: newUser
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


//app.use(passport.initialize());
//configurePassport();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

router.post('/register', function(req, res){
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  var userHashed = {
    username  : req.body.username,
    email     : req.body.email,
    phone     : req.body.phone,
    password  : hash
  };
  models.User.find({where: {username: req.body.username}}).then(function(user){
      if(!user){
        models.User.find({where: {email: req.body.email}}).then(function(user){
          if(!user){
            models.User.create(userHashed)
            .then(function(){
              sendMailNewUser(req.body.email, req.body.username);
            })
            .error(function(err){
              console.log(err);
          })
        } else {

        }
      })
    } else {

    }
  })
  res.send("Successful registration");
});

router.post('/login', function(req, res){
  models.User.findOne({where: {username: req.body.username}}).then(function(user){
    if(!user){
      res.send("IncorrectMailPass")
    } else {
      if(bcrypt.compareSync(req.body.password, user.password)) {
        req.session.username = user.username;
        if(user.activeAcc === true) {
          if(user.last_login == null){
            setLastLoginTime(user.username);
            res.send("firstLogin");
          }
          else {
            setLastLoginTime(user.username);
            res.send("nextLogin");
          }
        } else {
          res.send("isUnactive");
        }
      } else {
        res.send("IncorrectMailPass")
      }
    }
  })
});

router.get('/signout', function(req, res){
  req.session.destroy();
  res.send();
});



router.post('/userDetails', function(req, res){
  models.User.findOne({where: {username: req.session.username}}).then(function(user){
    var userDet = {
      idUser    : user.id,
      firstName : req.body.firstName,
      lastName  : req.body.lastName,
      gender    : req.body.gender,
      cityLive  : req.body.cityLive,
      address   : req.body.address,
      birthDay  : req.body.birthDay
    }
    if(user){
      models.UserDetails.create(userDet).then(function(){
        res.send("OK")
      })
    } else {
      console.log('user not exists');
    }
  })
});

router.post('/resetPassword/:email', function(req, res){
  var randomPasswd = Math.random().toString(36).slice(-8);
  console.log(randomPasswd);
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(randomPasswd, salt);

  models.User.update({ password : hash }, {where: {email :  req.params.email}})
    .then(function() {
     console.log("User reset password successfully!");
     console.log(randomPasswd);
     sendMailResetPasswd(req.params.email, randomPasswd);
  }).error(function(err) {

     console.log("Password update failed !");
     //handle error here
  });
  res.send();
});

router.delete('/deleteAcc/:id', function(req, res){
  models.User.destroy({where: {id: req.params.id }}).then(function() {
    models.UserDetails.destroy({where: {idUser : req.params.id}}).then(function() {
      req.session.destroy();
      res.send();
    })
    .error(function(err) {
        console.log("User details delete failed !");
    });
   })
   .error(function(err) {
       console.log("User delete failed !");
   });

});

router.post('/updateUserDetails/:id',function(req, res){
  var data = {
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    cityLive  : req.body.cityLive,
    address   : req.body.address
  }
  models.UserDetails.update({
  firstName : req.body.firstName,
  lastName  : req.body.lastName,
  cityLive  : req.body.cityLive,
  address   : req.body.address}
  ,{where: {id : req.params.id}}).then(function() {
   }).error(function(err) {

       console.log("User details update failed !");
       //handle error here
   });
   res.send();
});

router.post('/editPassword/:username',function(req, res){
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  models.User.update({password : hash} , {where: {username : req.params.username}}).then(function() {
    res.send("Password changed");
   }).error(function(err) {
       res.send(err);
       //handle error here
   });
});

router.get('/checkRightPassowds/:username/:password',function(req, res){
  models.User.findOne({where: {username: req.params.username}}).then(function(user){
    if(!user){}
    else {
      if(bcrypt.compareSync(req.params.password, user.password)){
        res.send("theSamePassword");
      } else {
        res.send("otherPasswords");
      }
    }
  })
});

router.get('/getUserDetails', function(req, res){
  res.send({username : req.session.username});
});

router.get('/getUsers', function(req, res){
  models.User.findOne({where: {username: req.session.username}}).then(function(user){
    if(!user){}
    else{
      models.UserDetails.findOne({where: {idUser: user.id}}).then(function(userDetails){
        if(!userDetails){}
        else {
          res.send({user, userDetails});
        }
      })
    }
  })
});

router.get('/activeAccount/:username',function(req, res){
  models.User.update({ activeAcc: true }, {where: {username :  req.params.username}}).then(function() {
 }).error(function(err) {
     //handle error here
 });
 res.send();
});

router.post('/isOnlineNow/:username',function(req, res){
  models.User.update({ onlineNow: true }, {where: {username :  req.params.username}}).then(function() {
 }).error(function(err) {
     //handle error here
 });
 res.send();
});

router.post('/isOnlineOffline/:username',function(req, res){
  models.User.update({ onlineNow: false }, {where: {username :  req.params.username}}).then(function() {
 }).error(function(err) {
     //handle error here
 });
 res.send();
});

router.post('/resetPasswordAct/:email',function(req, res){
  models.User.update({ passwdReset: true }, {where: {email :  req.params.email}}).then(function() {
 }).error(function(err) {
     //handle error here
 });
 res.send();
});

router.post('/resetPasswordUnact/:email',function(req, res){
  models.User.update({ passwdReset: false }, {where: {email :  req.params.email}}).then(function() {
   }).error(function(err) {
       //handle error here
   });
   res.send();
});

function setLastLoginTime(usernameP){
  var today = new Date();
  models.User.update({last_login : today}, {where: {username : usernameP}}).then(function() {
  }).error(function(err) {
      //handle error here
  });
}




app.use('/api', router);
app.use('/cars', cars);

//Sync Database {force:true}
models.sequelize.sync().then(function(){
  console.log('Nice! Database looks fine');
}).catch(function(err){
  console.log(err,"Something went wrong with the Database Update!");
});


app.listen(3000);

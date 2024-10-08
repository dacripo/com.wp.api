var userModel = require('../models/userModel.js');
var winston = require('winston');
winston.level = process.env.LOG_SSSLEVEL || 'info';
/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        winston.log('debug', 'userController.list()');
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        winston.log('debug', 'userController.show()');
        var id = req.params.id;
        userModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * checkIfUserExist.show()
     */
    checkIfUserExist: function (req, res) {
        var email = req.params.email;
        var phone = req.params.phone;
        var userId = req.params.userId;

        if (userId) {

            userModel.findOne({ "userId": userId }, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
                if (user) {
                    return res.json(user);
                } else {

                    userModel.findOne({ "email": email }, function (err, user) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when getting user.',
                                error: err
                            });
                        }
                        if (user) {
                            return res.json(user);
                        } else {

                            userModel.findOne({ "phone": phone }, function (err, user) {
                                if (err) {
                                    return res.status(500).json({
                                        message: 'Error when getting user.',
                                        error: err
                                    });
                                }
                                if (user) {
                                    return res.json(user);
                                } else {
                                    return res.json({});
                                }
                            });

                        }
                    });
                }
            });

        } else if (email) {
            userModel.findOne({ "email": email }, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
                if (user) {
                    return res.json(user);
                } else {

                    userModel.findOne({ "phone": phone }, function (err, user) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when getting user.',
                                error: err
                            });
                        }
                        if (user) {
                            return res.json(user);
                        } else {
                            return res.json({});
                        }
                    });

                }
            });
        } else if (phone) {
            userModel.findOne({ "phone": phone }, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
                if (user) {
                    return res.json(user);
                } else {
                    return res.json({});
                }
            });
        }

        if (!phone && !email && !userId) {
            return res.json({});
        }
    },


    /**
     * userController.show()
     */
    showByUserId: function (req, res) {
        var userId = req.params.userId;
        userModel.findOne({ userId: userId }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },
    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
            userId: req.body.userId,
            createdDate: req.body.createdDate,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            sex: req.body.gender,
            age: req.body.ageRange,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            onesignalId: req.body.onesignalId,
            googleId: req.body.googleId,
            facebookId: req.body.facebookId,
            profileImg: req.body.profileImg,
            lng: req.body.lng,
            lat: req.body.lat,
            postCode: req.body.postCode,
            interests: req.body.interests,
            points: req.body.points,
            hasPushEnabled: req.body.hasPushEnabled,
            hasGeolocEnabled: req.body.hasGeolocEnabled,
            hasProfileCompleted: req.body.hasProfileCompleted,
            trollNumber: req.body.trollNumber
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.userId = req.body.userId ? req.body.userId : user.userId;
            user.createdDate = req.body.createdDate ? req.body.createdDate : user.createdDate;
            user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
            user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
            user.sex = req.body.gender ? req.body.gender : user.sex;
            user.age = req.body.ageRange ? req.body.ageRange : user.age;
            user.email = req.body.email ? req.body.email : user.email;
            user.phone = req.body.phone ? req.body.phone : user.phone;
            user.password = req.body.password ? req.body.password : user.password;
            user.onesignalId = req.body.onesignalId ? req.body.onesignalId : user.onesignalId;
            user.googleId = req.body.googleId ? req.body.googleId : user.googleId;
            user.facebookId = req.body.facebookId ? req.body.facebookId : user.facebookId;
            user.profileImg = req.body.profileImg ? req.body.profileImg : user.profileImg;
            user.lng = req.body.lng ? req.body.lng : user.lng;
            user.lat = req.body.lat ? req.body.lat : user.lat;
            user.postCode = req.body.postCode ? req.body.postCode : user.postCode;
            user.interests = req.body.interests ? req.body.interests : user.interests;
            user.points = req.body.points ? req.body.points : user.points;
            user.hasPushEnabled = req.body.hasPushEnabled ? req.body.hasPushEnabled : user.hasPushEnabled;
            user.hasGeolocEnabled = req.body.hasGeolocEnabled ? req.body.hasGeolocEnabled : user.hasGeolocEnabled;
            user.hasProfileCompleted = req.body.hasProfileCompleted ? req.body.hasProfileCompleted : user.hasProfileCompleted;
            user.trollNumber = req.body.trollNumber ? req.body.trollNumber : user.trollNumber;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

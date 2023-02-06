const db = require('../connect.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports =  {
    register: function (req, res) {
        //CHECK IF USER ALREADY EXISTS
        const q = 'SELECT * FROM users WHERE username = ?';

        db.query(q, [req.body.username], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.length) return res.status(409).json('User already exists!');

            //CREATE A NEW USER

            //Hashing the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const q = 'INSERT INTO users (`username`, `email`, `password`, `active`) VALUE (?)';

            const values = [
                req.body.username,
                req.body.email,
                hashedPassword,
                req.body.active
            ];

            db.query(q, [values], (err, data) => {
                if(err) return res.status(500).json(err);
                return res.status(200).json('User has been created.');
            });
        });
    },
    login: function(req, res) {
        const q = "SELECT * FROM users WHERE username = ?";

        db.query(q, [req.body.username], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.length === 0) return res.status(404).json('User not found!');

            const checkPassword = bcrypt.compareSync(
                req.body.password,
                data[0].password
            );

            if(!checkPassword) return res.status(400).json('Wrong password!');

            const token = jwt.sign({ idUser: data[0].idUser }, "secretkey");

            const { password, ...others } = data[0];

            res.cookie('accessToken', token, {
                httpOnly: true
            }).status(200).json(others);
        });
    },
    logout: function(req, res) {
        res.clearCookie("accessToken", {
            secure: true,
            sameSite: 'none'
        }).status(200).json('User has been logged out');
    }
}
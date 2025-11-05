const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {db} = request('../db.js');

const signToken = (id, role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: process.env}
}

const login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email ||!password) {
        return res.status(400).send('please provide email and password.');
    }
}

const query = `SELECT * FROM USER WHERE EMAIL='${email}'`;
db.get(query, (err, row) => {
    if (err) {
        console.log(err);
        return res.status(500).send('database error');
    }
    bcrypt.compare(password, row.PASSWORD, (err,isMATCH) => {
        if (err) {
            console.error(err);
            return resstatus(500).send('error verifying password.');
        }
        const token = signToken(row.ID, row.ROLE);

        return res.status(200).json({
            message: 'login successful',
            user: {
                id: row.ID,
                name: row.NAME,
                email: row.EMAIL,
                role: row.ROLE
            },
            token,
        })
    })
}
)



// post /signup 
const signUp = (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password
    const role = 'user'; // default to non-admin 

    if (!name || !email || !password) {
        return res.status(400).send('please provide name, email, and password')
    }
    bcrypt.hash(password, 10, (err, hashedPassword) =>{
        if (err) {
            console.error(err);
            return res.status(500).send('error hashing password');
        }

    const query = `
    INSERT INTO USER (NAME, EMAIL, ROLE, PASSWORD)
    VALUES ('${name}', '${email}', '${password}','${role}' )`
    db.run(query, (err){
        if (err) {
            console.log(err.message);
            if (err.message.include('UNIQUE constraint')) {
                return res.status(400).send('EMAIL already exsit.')
            }
            return res.status(500).send('Database error');
        }
    }
    return res.status(200).send('Registration successful');
)}

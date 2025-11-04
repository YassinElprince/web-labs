const {db} = request('../db.js');

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

const {app}= require('./index')

const db_access = require('./db.js');
const db = db_access.db;

const PORT=3000;

db.serialize(() => {
    db.run(db_access.createTripTable, (err) => {
        if (err) console.log('error creating trip table:', err.message);
    });
});

app.listen(PORT,()=>{
    console.log(`Server is runing on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');//it helps api server to communicate and share resources to client server
const mongoose = require('mongoose');//to have connectivity with mongodb 
const bcrypt = require('bcryptjs');//to make password more secure instead of passing password as simple text
const jwt = require('jsonwebtoken');//this is 
const User = require('./models/User');//to access user schema
const cookieParser = require('cookie-parser');//to parse the cookie
const imageDownloader = require("image-downloader");
const multer = require('multer');
const fs = require('fs');//this helps in renaming file name
const Place = require('./models/Place');
const Booking = require("./models/booking");
const { rejects } = require('assert');
const path = require('path');

require('dotenv').config();//to handle .env file to hold important info like mongodb password
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);//to add more salt to password
const jwtSecret = process.env.jwtSecret;
const PORT = process.env.PORT;

app.use(express.json());//This is used to parse incoming data from rq.body
app.use(cookieParser());//this is used for maintainnig user cookie information

// In simple terms, this line tells the Express.js application to serve all files located in 
//the uploads directory whenever a request URL starts with /uploads
app.use('/uploads', express.static(__dirname + '/uploads'));
// console.log(__dirname);
app.use(cors({
    origin: "https://hotel-booking-6-277c.onrender.com",
    credentials: true,
}));

// console.log(process.env.MONGO_URL);
//mogodb connection

//when you are using asynchronous inside of a function then you have to wrap it inside of promise
//like here jwt is asynchronous so it wrap inside of promise so this function either return resolved or rejected value
function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

app.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;
    // res.json({userName ,email ,password});
    try {
        const userDoc = await User.create({
            userName,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),//here it mainly hash the password using bcrypt 
            //which is synchronous using hashSync here and also bcryptSalt is added so every time new hash password will genrated
        });
        res.json(userDoc);

    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // const allData = await User.find();
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        //here it hashed the given password and then  and checks if the plain text password, when hashed, matches the stored hash
        const passok = bcrypt.compareSync(password, userDoc.password);

        if (passok) {
            //here we genrating cookie after login to manage user session 
            //jwt.sign(payload,secret,option,callback);
            //here it genrating token from these given payload 
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);//here  server sends back a response containing the user's data (userDoc) along with setting a cookie with the JWT.
            });

        } else {
            res.status(422).json('pass Not OK');
        }
    } else {
        res.status(422).json('not registerd');
        // alert("registre first");
        // return;
    }

});

// jwt.verify can be used to retrieve data from token then to show data on page
//profile route is called so to get the current user data       
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            //here it genrating user from given token as payload which store all userinfo given at time of login
            const { userName, email, _id } = await User.findById(userData.id);
            res.json({ userName, email, _id });
        })
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

// console.log('directory---->>',__dirname); ---> __dirname store full path of this page
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName, // here we add upload name in directory to send uploaded image link 
    });
    res.json(newName);
});

const upload = multer({ dest: 'uploads/' });
app.post('/uploads', upload.array('photos', 100), (req, res) => {
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadFiles);
});

//Place Creation
app.post('/places', async (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhoto, description, perks, extraInfo, checkIn, checkOut, maxGuest, price, } = req.body;

    //here jwt.verify and token is used so to get user id to upload that user data
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            //from here sending place owner id
            owner: userData.id,
            //adding data and addedPhoto is stored as photos in places
            title, address, photos: addedPhoto, description, perks, extraInfo, checkIn, checkOut, maxGuest, price,
        });
        res.json(placeDoc.perks);
    });

});

//this is for placecard list display
app.get('/places', (req, res) => {
    //for taking user id
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        try {
            const { id } = userData;
            //findById is not used bcz it return only on value or null
            //but this find will return whole array
            const placeList = await Place.find({ owner: id });

            res.json(placeList);
        } catch (dbError) {
            console.error(dbError);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
});

//this is for placeForm  data
app.get(`/places/:id`, async (req, res) => {
    const { id } = req.params;//for place id
    const placeData = await Place.findById(id);
    res.json(placeData);
});

//place Update
app.put('/places', (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhoto, description, perks, extraInfo, checkIn, checkOut, maxGuest, price, } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        //placeDoc.owner.toString() is used here to convert objectId(id) in id
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set(
                { title, address, photos: addedPhoto, description, perks, extraInfo, checkIn, checkOut, maxGuest, price, }
            );
            await placeDoc.save();
        }
        res.json('ok');
    });
});

app.get('/index', async (req, res) => {
    const placeData = await Place.find();
    res.json(placeData);
    console.log(placeData);
});

app.get(`/show/:id`, async (req, res) => {
    const { id } = req.params;
    const data = await Place.findById(id);
    res.json(data);
});

app.post("/bookings", async (req, res) => {
    // const {id} = req.params;
    try {
        const userData = await getUserDataFromReq(req);
        const { place, checkIn, checkOut, maxGuest, name, email, bookingPrice, phoneNumber } = req.body;

        const data = await Booking.create({
            userId: userData.id, place, checkIn, checkOut, maxGuest, name, email, bookingPrice, phoneNumber
        });
        res.json(data);
    } catch (err) {
        console.log(err.message);
    }

});



app.get("/bookings", async (req, res) => {
    const userData = await getUserDataFromReq(req);
    try {
        res.json(await Booking.find({ userId: userData.id }).populate("place"));
    } catch (err) {
        res.json(err);
    }
});

app.get("/bookings/:id", async (req, res) => {
    const { id } = req.params;
    res.json(await Booking.findById(id).populate("place"));
});

// Serve the React frontend
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.get('/test', (req, res) => {
    res.json("test running ok");
});

app.listen(PORT, () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log('Mongodb Database connected');
        console.log(`port listening on ${PORT}`);
    } catch (error) {
        console.log(err.message);
    }
});                   
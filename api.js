const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');





dotenv.config();


const dbLink = `mongodb+srv://${process.env.DB_USERNAME}
:${process.env.DB_PASSWORD}@cluster0.ezd3vkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dbLink)
    .then(function (connection) {
        console.log("connected to db")
}).catch(err => console.log(err))

app.use(cookieParser());
app.use(express.json());

app.use(cors({
 origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
 credentials: true
}));

const AuthRouter = require('./Routers/AuthRouter');
const TvShowsRouter = require('./Routers/TvRouter');
const DiscoverRouter = require('./Routers/DiscoverRouter');
const MoviesRouter = require('./Routers/MovieRouter');
const UserRouter = require('./Routers/UserRouter');
const VideoRouter = require('./Routers/VideoRouter');
const PaymentRouter = require('./Routers/PaymentRouter');

app.use("/api/auth",AuthRouter);

app.use("/api/movies",MoviesRouter)

app.use("/api/tv",TvShowsRouter);

app.use("/api/discover",DiscoverRouter);

app.use("/api/user",UserRouter);

app.use("/api/payment",PaymentRouter);

app.use("/api/video",VideoRouter);


const PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
});
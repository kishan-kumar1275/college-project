const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const port = 5555;



app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ambulanceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error(" MongoDB connection error:", err);
});

// Schema & Model request form
const ReqdataSchema=new mongoose.Schema({
    name:String,
    mobile:String,
      createdAtt: {
        type: Date,
        default: Date.now
    }
});
const CallbackRequest1 = mongoose.model('CallbackRequest', ReqdataSchema);

app.post('/Request-Callback', async (req, res) => {
    const {
        name,
        mobile
           } = req.body;
try {
        const newEntry = new CallbackRequest1({
            name,
            mobile
           
        });

        await newEntry.save();
        res.send('Request form submitted successfully!');
    } catch (error) {
        console.error(' Error saving data:', error);
        res.status(500).send('Server error. Please try again.');
    }
});


// Schema & Model ambulance form

const dataSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    address: String,
    district: String,
    state: String,
    ambulance_type: String,
    Date_time: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

const Data = mongoose.model('Data', dataSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Handle Form Submission
app.post('/Book-Ambulance', async (req, res) => {
    const {
        name,
        mobile,
        email,
        address,
        district,
        state,
        ambulance_type,
        Date_time
    } = req.body;

    try {
        const newEntry = new Data({
            name,
            mobile,
            email,
            address,
            district,
            state,
            ambulance_type,
            Date_time
        });

        await newEntry.save();
        res.send(' Form submitted successfully!');
    } catch (error) {
        console.error(' Error saving data:', error);
        res.status(500).send('Server error. Please try again.');
    }
});

// Server Start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 



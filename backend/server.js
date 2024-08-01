const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect('');


const userSchema = new mongoose.Schema({
    name: String,
    teamName: String,
    mealCount: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

app.post('/createUser', async (req, res) => {
    const { name, teamName } = req.body;
    const user = new User({ name, teamName });
    await user.save();
    res.json(user);
});

app.get('/scan', async (req, res) => {
    const { name, teamName } = req.query;
    const user = await User.findOneAndUpdate(
        { name, teamName },
        { $inc: { mealCount: 1 } },
        { new: true }
    );
    res.json(user);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

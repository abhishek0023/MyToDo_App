require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const TodoModel = require("./models/todo");
const { TokenExpiredError } = require('jsonwebtoken');

// Database Connection
connection();

// middleware
app.use(express.json());
app.use(cors(
    {
        origin: ["https://my-to-do-app-client.vercel.app"],
        methods: ['POST', 'GET'],
        credentials: true
    }
));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req, res)=>{
    res.json("Hello Server!")
})

app.get('/get', (req, res)=>{
    // TodoModel.find()
    // .then(result => res.json(result))
    // .catch(error=> res.json(error))
    res.json("Hello Server")
})

// update task status API
app.put('/update/:id', (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id:id}, {done: true})
    .then(result => res.json(result))
    .catch(error=> res.json(error))
})
// Delete task from databse API
app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(error=> res.json(error))
})

// Add new task API
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then((result) => res.json(result))
    .catch((error)=> res.json(error))
})


// port

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));

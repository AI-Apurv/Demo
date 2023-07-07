const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

let details = [
    {
        "user_id": 1,
        "username": "user1",
        "user_birthyear": "Jan"
    },
    {
        "user_id": 2,
        "username": "user2",
        "user_birthyear": "Feb"
    },
    {
        "user_id": 3,
        "username": "user3",
        "user_birthyear": "Mar"
    }
];

app.get('/',(req, res)=>{
    res.send("page working")
})

app.get('/:user_id', (req, res) => {
    try{
        const id = Number(req.params.user_id);
        const user = details.find((find_id) => find_id.user_id === id);
        if(user){
            res.json(user);
        }
        else{
            res.status(500).send("User Not Found");
        }
    }
    catch{
        res.send("Bad Request");
    }
})

app.listen(port,()=>{
    console.log("Page working")
})
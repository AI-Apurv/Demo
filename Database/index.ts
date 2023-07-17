import express, { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { Request } from 'express';
import * as crypto from "crypto";




const app = express();
const sequelize = new Sequelize('my_newdb', 'postgres', '      ', {
    host: 'localhost',
    dialect: 'postgres'
  });


class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}


class Room extends Model {
  public room_id!: number;
  public participant1_id!: number;
  public participant2_id!: number;
}


class Message extends Model {
  public message_id!: number;
  public message_data!: string;
  public room_id!: number;
  public sender_id!: number;
}




(async function (){
    
    try {

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()



//users tables
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);


//room tables 
Room.init(
  {
    room_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    participant1_id: {
      type: DataTypes.INTEGER,
    },
    participant2_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Room',
    tableName: 'rooms',
  }
);


//message tables 
Message.init(
  {
    message_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message_data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
  }
);







User.sync();
console.log("The table for the User model, rooms model , messages model was just created!");

app.use(express.json());



//user sign up

app.post('/signup', async (req:Request, res:Response) => {

  const { username, password } = req.body;

  //checking if the user already exists 
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    res.status(400).send("Username already exists");
    return;
  }

  // Check if the password meets the requirements
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).send("Invalid password format");
    return;
  }

  const user = await User.create({ username, password });
  const userId = user.id;
 // console.log("hyy2")
  const token = jwt.sign({ userId }, 'secret');
 // res.send("signup successfull");
  res.send(token);
  
});


//sign in 


app.post('/signin', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Find the user with the given username and password
  const user = await User.findOne({ where: { username, password } });

  if (!user) {
    res.status(401).send("Invalid username or password");
    return;
  }

  const userId = user.id;
  const token = jwt.sign({ userId }, 'secret');

  res.send(token);
});


//create chat 

app.post('/createChat', async (req: Request, res: Response) => {
  try {
    const token = req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
      return res.status(400).send("Token not provided");
    }
    
    const from_data: any = jwt.verify(token, 'secret');
    console.log('---------------------------------------------------from_data:', from_data); // Check the from_data object in the console

    const from_id = from_data.userId;
    console.log('from_id:', from_id); // Check the from_id value in the console

    if (!from_id) {
      return res.status(400).send("Missing 'from_id' parameter");
    }
console.log("line 1 ---------------------------------------------------------")
    const to_id = req.body.to_id;
    if (!to_id) {
      return res.status(400).send("Missing 'to_id' parameter");
    }

    console.log("line 2 ---------------------------------------------------------")

    const [room_data]: any = await sequelize.query(`
      SELECT room_id FROM rooms 
      WHERE 
        (participant1_id='${to_id}' AND participant2_id='${from_id}') OR 
        (participant1_id='${from_id}' AND participant2_id='${to_id}')
    `);
    console.log("line 3 ---------------------------------------------------------")
    if (room_data && room_data.length > 0) {
      return res.status(200).send(room_data);
    } else {
      const new_room_id = crypto.randomUUID();
      const newRoomObj = {
        participant1_id: to_id,
        participant2_id: from_id,
        room_id: new_room_id.substring(0, 8)
      };
      console.log("line 4 ---------------------------------------------------------")
      await Room.create(newRoomObj);
      return res.status(200).send(`${new_room_id} has been created for the participants`);
    }
  } catch (e: any) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});





//delete messages 


app.post('/delete',async(req:Request, res:Response)=>{

  try{
      
      const {room_id} = req.query;
      
      let deleteData = await Message.destroy({
          where: {
              room_id:room_id
          }
      })
      
      res.status(200).send("chat deleted")
  }catch(e:any){
      
      res.status(400).send(e)
  }
})



//fetch result


app.post('/fetch',async (req: Request, res: Response) => {

  try{
      const { page, size } = req.query;
      const { limit, offset } = getPagination(Number(page), Number(size));

      let messages = await Message.findAndCountAll({ limit,offset})
      res.status(200).send(messages)
  }catch(e){
      res.status(400).send(e);
  }
})

const getPagination = (page:any, size:Number) => {
  const limit = size ?  +(size) : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};








app.listen(4000, () => {
  console.log('Server started on port 3000');
});

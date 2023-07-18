import mongoose, { Connection } from 'mongoose';


const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/mydb', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export {connectToDatabase};









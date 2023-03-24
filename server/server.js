import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi} from 'openai';
//const util = require('util');



dotenv.config();

    

 const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);//create an instance of openai 

const app = express();
app.use(cors());
app.use(express.json());//allow you to pass json from frontend to backend

app.get('/',async (req,res) =>  {

    try{
    res.status(200).send({
        message: 'Hello from Chad GPT'
    })
    }catch(error){
        console.log(error);
    }

});


app.post('/', async (req, res) => {
    try{
        const prompt = req.body.prompt;
        const response = await openai.Completion.create({
           // model:"text-davinci-003",
            prompt: "<my prompt>", // the data area in the front end contains the area for prompt
            max_tokens:5,//give pretty long answers
            temperature:1.0, //the model will take lesser risks
            
           // top_p:1,
            //frequency_penalty:0.5,//will not repeat similar sentences
           // presence_penalty:0,
            echo : True,
            
        });

        res.status(200).send({
            bot : response.data.choices[0].text
        })
    }catch(error){
            console.log(error);
            res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000') );




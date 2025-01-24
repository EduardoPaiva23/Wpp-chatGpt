import express from "express"
import bodyParser from "body-parser";
import cors from 'cors'
import { sendWhatsappMenssage } from "./services/twilio";
import dotenv from 'dotenv';

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

app.post('/chat/send', async (req, res) => {
    const {to, body} = req.body
    try {
        await sendWhatsappMenssage(`whatsapp:${to}`, body)
        res.status(200).json({success: true, body})
    } catch (error) {
        res.status(500).json({success: false, error})
    }
})

const port = 7000

app.listen(port, () => {
    console.log(`O servidor conectou na porta ${port}`)
})
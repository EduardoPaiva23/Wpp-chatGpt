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

app.post('/chat/receive', async (req, res) => {
    const TwilioRequestBody = req.body
    const messageBody = TwilioRequestBody.Body
    const to = TwilioRequestBody.From

    try {
        await sendWhatsappMenssage(to, messageBody)
        res.status(200).json({success: true, messageBody})
    } catch (error) {
        res.status(500).json({success: false, error})
    }
})

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log(`O servidor conectou na porta ${port}`)
})
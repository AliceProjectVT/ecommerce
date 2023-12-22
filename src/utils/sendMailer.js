
import { configObject } from '../config/config.js';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.nodemail_user,
        pass: configObject.nodemail_pass
    }
});

const sendMail = async (to, subject, html) => {
    return await transport.sendMail({
        from: `Testing <${configObject.nodemail_user}>`,
        to,
        subject,
        html, 
        attachments: [{
            filename: 'MASTERCHIEFT.jpg',
            path: './src/utils/MASTERCHIEFT.jpg',
            cid: 'imagen'
        }]

    });
};

export default sendMail;





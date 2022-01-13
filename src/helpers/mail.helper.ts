import nodemailer from "nodemailer";

interface MailParam{
  from: string;
  to: string;
  subject: string;
  message: string;
  data: string;
}
class Mailer{
  private transporter;
  constructor(){
    this.transporter = nodemailer.createTransport({
      service:"Gmail",
      auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    })
  }

  async sendMail({ from, to, subject , message, data }:MailParam){
    const mailData = {
      from,
      to,
      subject,
      text: message,
      html: `<p>Password Reset Token</p>+Token:<p>User Verification Token</p>${ data }`
    }

    try{
      await this.transporter.sendMail(mailData);
      return true;
    }catch(ex){
      console.log(ex);
      return false;
    }
  }
}

const mailer = new Mailer();
export { mailer };
import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import path from "path";
import { MailParam } from "@interfaces";

class Mailer {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.join(__dirname, "../views/"),
        layoutsDir: path.join(__dirname, "../views/"),
        defaultLayout: "",
      },
      viewPath: path.join(__dirname, "../views/"),
      extName: ".handlebars",
    };

    this.transporter.use("compile", hbs(handlebarOptions));
  }

  async sendMail({ from, to, subject, message, data }: MailParam) {
    const mailData = {
      from,
      to,
      subject,
      template: "verify",
      text: message,
      context: {
        email: to,
        code: data,
        loginInfo: {
          device: "Windows",
          desktop: false,
          mobile: true,
          timeStamp: "January 14 , 2022, 5:42 AM (GMT)",
          browser: "Chrome",
          location: "Pokhara, Nepal",
        },
      },
    };

    try {
      await this.transporter.sendMail(mailData);
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}

const mailer = new Mailer();
export { mailer };

import { Router, Response, Request } from "express";
import { User } from "../models";

const router = Router();

/**
 * @route GET/POST/PUT/DELETE auth
 * @desc user authentication
 * @access allow all
 */
router.get("/", (req: Request, res: Response) => {
  res.send("Hello Hello Chat");
});

// router.post("/user", async (req: Request, res: Response) => {
//   const { firstName, lastName, username, email, avatar, bio } = req.body;
//   const user = new User({
//     firstName,
//     lastName,
//     username,
//     email,
//     avatar,
//     bio
//   })
//   await user.save();
//   res.send(user);
// });

router.post("/email", async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    const newUser = new User({
      email,
      tokenData: {
        token: "11234",
        expiresIn: new Date(new Date().getTime() + 600000),
      },
    });
    const result = await newUser.save();

    return res.status(200).json({
      status: "success",
      data: {
        emailToCheck: result.email,
        isNewUser: true,
      },
    });
    //send mail
  }
  const tokenData: any = {
    token: "11234",
    expiresIn: new Date(new Date().getTime() + 600000),
  };
  user.tokenData = tokenData;
  const result = await user.save();

  return res.status(200).json({
    status: "success",
    data: {
      emailToCheck: result.email,
      isNewUser: false,
    },
  });

  //send email
});


export default router;

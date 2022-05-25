// import { Router } from "express";
// import {
//   sendFriendReq,
//   acceptRequest,
//   rejectRequest,
//   getAllInvites,
//   getSingleInvites,
//   getSentInvites,
//   deleteRequest,
// } from "@controllers";
// import { singleInviteRequests } from "@validators";
// import { handleErrors, wrapSync } from "@helpers";
// import { verifyLogin } from "@middlewares";

// const inviteRouter = Router();

// const singleInvite = Router({ mergeParams: true });

// inviteRouter.get("/", verifyLogin, wrapSync(getAllInvites));
// inviteRouter.get("/sent", verifyLogin, wrapSync(getSentInvites));

// inviteRouter.post("/", verifyLogin, wrapSync(sendFriendReq));

// inviteRouter.use(
//   "/:inviteId",
//   singleInviteRequests(),
//   handleErrors,
//   verifyLogin,
//   singleInvite
// );

// singleInvite.get("/", verifyLogin, wrapSync(getSingleInvites));

// singleInvite.patch("/accept", verifyLogin, wrapSync(acceptRequest));
// singleInvite.patch("/reject", verifyLogin, wrapSync(rejectRequest));
// singleInvite.delete("/", verifyLogin, wrapSync(deleteRequest));

// export default inviteRouter;

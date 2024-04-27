import { Router } from "express";
import { signup, login } from "../middlewares/authentication.js";
import { protect, restrictTo } from "../middlewares/authentication.js";
import {
  getUser,
  getUsers,
  updateUser,
  removeUser,
} from "../controllers/users.js";
import multer from "multer";

const upload = multer();
const userRouter = Router();

userRouter.post("/signup", upload.single("profileImage"), signup);
userRouter.post("/login", login);

userRouter.get("/:id", protect, restrictTo("Admin", "User"), getUser);
userRouter.get("", protect, restrictTo("Admin"), getUsers);
userRouter.patch(
  "/:id",
  protect,
  restrictTo("Admin", "User"),
  upload.single("profileImage"),
  updateUser,
);
userRouter.delete("/:id", protect, restrictTo("Admin"), removeUser);

export default userRouter;

import User from "../../models/Users.js";

/**
 * @description This controller fetches all the users.
 */

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

/**
 * @description This controller fetches a particular user of some id.
 */

export const getUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

/**
 * @description This controller updates a particular user of some id.
 */

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        role: req.body.role,
        profileImage: req?.file?.originalname,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

/**
 * @description This controller removes a particular user of some id.
 */

export const removeUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

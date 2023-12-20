import UserModel from "../model/userSchema.js";
import bcryptjs from "bcryptjs";
// user model
import "../db connection/mongoo.js";
import jwt from "jsonwebtoken";
// signUp
const signupRoute = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    // console.log(name, mobile, email, password);

    if (name === "" || mobile === "" || email === "" || password === "") {
      return res.status(400).json({ message: "Please enter all details" });
    }

    // to check a valid email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // to check a valid password
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;
    if (!emailRegex.test(email)) {
      console.log("Please enter a valid email");
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    if (!passwordRegex.test(password)) {
      console.log(
        "Password must be at least 8 characters long and have at least one uppercase and one lowercase letter"
      );

      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and have at least one uppercase and one lowercase letter",
      });
    }

    const userexists = await UserModel.findOne({ email });

    if (userexists) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    } else {
      // hasing password
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = await bcryptjs.hashSync(password, salt);

      const usercreated = await UserModel.create({
        name: name,
        mobile: mobile,
        email: email,
        password: hashedPassword,
      });

      if (usercreated) {
        const jwttoken = jwt.sign(
          usercreated.toJSON(),
          process.env.JWT_SECRET_KEY,
          { expiresIn: "40s" }
        );

        console.log("user added");
        // Set the token in the response headers
        return res
          .status(200)
          .json({ message: "User has been created", jwttoken: jwttoken });
      } else {
        console.log("User could not be created");
        return res.status(400).json({ message: "User could not be created" });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: "unable to send data" });
  }
};

// +++++++++++++++++++++++++++++++********************************==================================================
// login
const loginRoute = async (req, res) => {
  try {
    const { mobileORemail, password } = req.body;
    // console.log(mobileORemail,password);

    if (mobileORemail === "" || password === "") {
      return res.status(400).json({ message: "Please enter all details" });
    }

    const userexists =
      (await UserModel.findOne({ email:mobileORemail })) ||
      (await UserModel.findOne({ mobile:mobileORemail }));

    if (!userexists) {
      console.log("User notfound");
      return res.status(400).json({ message: "User not found" });
    } else {
      // matching password
      const salt = bcryptjs.genSaltSync(10);

      const passwordsMatch = bcryptjs.compareSync(
        password,
        userexists.password
      );

      if (passwordsMatch) {
        const jwttoken = jwt.sign(
          userexists.toJSON(),
          process.env.JWT_SECRET_KEY,
          { expiresIn: "40s" }
        );
        // Set the token in the response headers
        return res
          .status(200)
          .json({ message: "User loggedin", jwttoken: jwttoken });

      } else {
        console.log("User not registered");
        return res.status(400).json({ message: "Not a user" });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: "unable to login" });
  }
};

export { signupRoute, loginRoute };

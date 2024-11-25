const User = require("../model/User");

const bcrypt = require("bcryptjs");
const saltRounds = 10; // salt 암호화를 몇번할건지
const userController = {};

// createUser
userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body; // front 값 가져오기

    // 유저가 있는지 check
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입된 사용자입니다.");
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    console.log(hash);

    const newUser = new User({ email, name, password: hash });
    await newUser.save();

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// loginWithEmail
userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);

      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }

    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const sendEmail = require("../helper/sendEmail");
const { generateToken, gerateRefreshToken } = require("../helper/auth");
const { success, failed } = require("../helper/response");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const checkEmail = await authModel.findBy("email", email);
      if (checkEmail.rowCount == 0) {
        const id = uuidv4();
        const is_verified = false;
        const token = crypto.randomBytes(16).toString("hex");
        const passwordHash = await bcrypt.hash(password, 10);
        const data = {
          id,
          name,
          email,
          password: passwordHash,
          is_verified,
          token,
        };
        await authModel.register(data);
        sendEmail.sendConfirmationEmail(email, token, name);
        success(res, {
          code: 200,
          status: "success",
          message: "register succcess, verify your email",
          data: data,
        });
      } else {
        const err = {
          message: "email is already registered",
        };
        failed(res, {
          code: 409,
          status: "error",
          message: err.message,
          error: [],
        });
        return;
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error,
        error: [],
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await authModel.findBy("email", email);
      if (user) {
        if (user.is_verified === true) {
          bcrypt.compare(password, user.password).then(async (match) => {
            delete user.password;
            delete user.is_verified;
            if (match) {
              const token = await generateToken({
                id: user.id,
              });
              success(res, {
                code: 200,
                status: "success",
                message: "login success",
                token: token,
                user,
              });
            } else {
              success(res, {
                code: 500,
                status: "error",
                message: "wrong email or password",
                error: [],
              });
            }
          });
        } else {
          const err = {
            message: "account not verified by email",
          };
          failed(res, {
            code: 500,
            status: "error",
            message: err.message,
            error: [],
          });
          return;
        }
      } else {
        failed(res, {
          code: 404,
          status: "error",
          message: "email not registered",
          error: [],
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { token } = req.query;
      const verifyTokenCheck = await authModel.findBy("token", token);
      if (verifyTokenCheck.rowCount > 0) {
        await authModel
          .verifyingEmail(token)
          .then(() => {
            res.send(`
      <center>
      <div>
        <h1>Activation Success</h1>
      </div>
      </center>
        `);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const err = {
          message: "verify token is invalid",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
};

module.exports = authController;

const express = require("express");
const app = express();
const customerRoute = express.Router();

// customer schema
let CustomerSchema = require("../model/customer.model");
let Authen = require("../middleware/authen");

// SignUp customer
customerRoute.post("/signup", (req, res, next) => {
  let token = Authen.generateAccessToken(req.body);
  CustomerSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json({ code: 200, data: data, message: "success", token: token });
    }
  });
});

// SignIn customer
customerRoute.post("/signIn", (req, res, next) => {
  let token = Authen.generateAccessToken(req.body);
  CustomerSchema.find(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json({ code: 200, data: data, message: "success", token: token });
    }
  });
});

// demo function send Otp when customer forget passwork
const sentOtp = (email) => {
  //code....
  return 111;
};

// demo function handle Otp from customer

const checkOtp = (otp) => {
  // code...
  if (otp == 111) {
    return true;
  }
  return false;
};

// forget password
customerRoute.post("/forget_password", (req, res, next) => {
  sentOtp(res.body.email);
});

// create new password
customerRoute.put("/new_password", (req, res, next) => {
  if (checkOtp(res.body.otp)) {
    CustomerSchema.findByIdAndUpdate(
      req.body.phone,
      {
        $set: req.body.password,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          let token = Authen.generateAccessToken(data);
          res.json({ code: 200, message: "success", data: data, token: token });
          console.log("Customer Password successfully updated!");
        }
      }
    );
  } else {
    res.json({ code: 400, message: "Error with otp code", data: null, token: null });
  }
});

module.exports = customerRoute;

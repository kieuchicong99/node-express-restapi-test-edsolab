const express = require("express");
const app = express();
const complainRoute = express.Router();

// complain schema
let ComplainSchema = require("../model/complain.model");


// Get by fillter or all :  from_date, to_date,  phone customer, id_department
complainRoute.route("/filter").get((req, res) => {
  var queryCond = {};
  if (req.query.customer_phone) {
    queryCond.customer_phone = req.query.customer_phone;
  }
  if (req.query.id_department) {
    queryCond.id_department = req.query.id_department;
  }
  if (req.query.from_date && req.query.to_date) {
    queryCond.time_creted = {
      $gt: new Date(from_date).toISOString(),
      $lt: new Date(to_date).toISOString(),
    };
  }
  ComplainSchema.find(queryCond, (error, da) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ data, message: "success" });
    }
  });
});

// Get complain by id
complainRoute.route("/get-complain/:id").get((req, res) => {
  ComplainSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ data, message: "success" });
    }
  });
});

// Create complain
complainRoute.route("/create-complain").post((req, res, next) => {
  ComplainSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ data, message: "success" });
    }
  });
});

// Update complain
complainRoute.route("/update-complain/:id").put((req, res, next) => {
  ComplainSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({ data, message: "success" });
        console.log("complain successfully updated!");
      }
    }
  );
});

// Delete complain
complainRoute.route("/remove-complain/:id").delete((req, res, next) => {
  ComplainSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = complainRoute;

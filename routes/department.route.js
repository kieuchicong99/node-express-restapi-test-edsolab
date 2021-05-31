const express = require("express");
const app = express();
const departmentRoute = express.Router();

// department schema
let DepartmentSchema = require("../model/department.model");

// Create department
departmentRoute.route("/create-department").post((req, res, next) => {
  DepartmentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ data, message: "succes" });
    }
  });
});

// Get department by id
departmentRoute.route("/get-department/:id").get((req, res) => {
  DepartmentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ data, message: "succes" });
    }
  });
});

// Get All or filter department
departmentRoute.route("/filter").get((req, res) => {
    let queryCond ={}
    if(req.query.name){
        queryCond.name= req.query.name
    }
  DepartmentSchema.find(queryCond,(error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({ message: "success", data });
    }
  });
});


// Update department
departmentRoute.route("/update-department/:id").put((req, res, next) => {
  DepartmentSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({ data, message: "success" });
        console.log("department successfully updated!");
      }
    }
  );
});

// Delete department
departmentRoute.route("/remove-department/:id").delete((req, res, next) => {
  DepartmentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        message: "success",
        data,
      });
    }
  });
});

module.exports = departmentRoute;

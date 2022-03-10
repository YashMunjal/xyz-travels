const Vehicle = require("../../models/vehicleModel");

module.exports = function (app) {
  app.get("/admin/get-all-vehicle-details", async (req, res) => {
    if (req.user) {
      if (req.user.usertype === "admin") {
        Vehicle.find({}, (err, vehicle) => {
          if (vehicle.length !== 0) {
            res.json(vehicle);
          } else {
            res.json({
              status: false,
              message: "No vehicle found",
            });
          }
        });
      } else {
        res.json({
          status: false,
          message: "Please have admin rights",
        });
      }
    } else {
      res.json({
        status: false,
        message: "Please Login!",
      });
    }
  });

  app.get("/admin/vehicle-details/:id", async (req, res) => {
    if (req.user) {
      if (req.user.usertype === "admin") {

      } else {
        res.json({
          status: false,
          message: "Please have admin rights",
        });
      }
    } else {
      res.json({
        status: false,
        message: "Please Login!",
      });
    }
  });

  app.post("/admin/add-vehicle", async (req, res) => {
    if (req.user) {
      if (req.user.usertype === "admin") {
        var vehicle = new Vehicle();
        vehicle.vehicleType=req.body.vehicleType
        vehicle.vehicleNumber=req.body.vehicleNumber
        vehicle.vehicleMake=req.body.vehicleMake
        vehicle.vehicleCapacity=req.body.vehicleCapacity
        vehicle.vehicleFair=req.body.vehicleFair
        vehicle.vehicleDriver=req.body.vehicleDriver
        await driver.save(function (err) {});
        res.json({
          status: true,
          message: "Vehicle Added Succesfully",
        });
      } else {
        res.json({
          status: false,
          message: "Please have admin rights",
        });
      }
    } else {
      res.json({
        status: false,
        message: "Please Login!",
      });
    }
  });
};

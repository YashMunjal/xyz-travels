const Driver = require("../../models/DriverModel");

module.exports = function (app) {
  app.get("/admin/get-all-driver-details", async (req, res) => {
    if (req.user) {
      if (req.user.usertype === "admin") {
        Driver.find({}, (err, driver) => {
          if (driver.length !== 0) {
            res.json(driver);
          } else {
            res.json({
              status: false,
              message: "No driver found",
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

  app.get("/admin/driver-details/:id", async (req, res) => {
    if (req.user) {
      if (req.user.usertype === "admin") {
        var driver;
        await Driver.find({_id:req.params.id},function(err,driverFound){
          driver=driverFound;
        })
        if(driver){
          res.json({
            status:true,
            driver
          })
        }else{
          res.json({
            status:false,
            message:"No Driver Found"
          })
        }
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

  app.post("/admin/add-driver", async (req, res) => {
    if (req.user) {
      if (req.user.email==="admin@gmail.com") {
        var driver = new Driver();
        driver.name = req.body.name;
        driver.aadharNumber = req.body.aadharNumber;
        driver.address = req.body.address;
        driver.city = req.body.city;
        driver.state = req.body.state;
        driver.pincode = req.body.pincode;
        driver.mobileNumber = req.body.mobileNumber;
        await driver.save(function (err) {});
        res.redirect('/')
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

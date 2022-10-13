/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js
 * import express */
 const express = require("express");
 const cors = require("cors");
 const app = express();
 const bodyParser = require("body-parser");

 
 let carsMockData = [
   {
     id: "1",
     brand: "Hyundai",
     model: "Ioniq",
     releaseYear: 2017,
     color: "blue",
   },
   {
     id: "2",
     brand: "Toyota",
     model: "Prius",
     releaseYear: 2007,
     color: "blue",
   },
   {
     id: "3",
     brand: "Chevrolet",
     model: "Aveo",
     releaseYear: 2007,
     color: "white",
   }
 ];
 
 // TO SUPPORT CORS.
 app.use(cors());
 app.use(
   bodyParser.urlencoded({
     extended: true,
   })
 );
 
 /**bodyParser.json(options)
  * Parses the text as JSON and exposes the resulting object on req.body.
  */
 app.use(bodyParser.json());
 
 /** Create GET API. API shoudl return  const carsMockData*/
 app.get("/", function (req, res) {
   res.send(`<h1 style="text-align:center">Cars Data</h1>`);
 });
 
 app.get("/cars-data", function (req, res) {
   res.send(carsMockData);
 });
  
 const server = app.listen(8080, function () {
   console.log(`App listening at http://127.0.0.1:8080/`);
 });
 
 app.post("/save", (req, res) => {
   const newCarData = req.body;
   let resVal = {};
 
   carsMockData.map((car, i) => {
     if (car.id === newCarData.id) {
         carsMockData[i] = newCarData;
         resVal = {
           status: 200,
           message: "new car data updated",
           res: carsMockData,
       }
     }
   });
 
   if (!carsMockData.some((carData) => carData.id === newCarData.id)) {
     // Add car to the carsMockData
     carsMockData.push(newCarData);
     resVal = {
       status: 200,
       message: "new car added",
       res: carsMockData,
     };
   }
   
   console.log(newCarData);
   console.log(carsMockData);
   res.json(resVal);
 });
 
 // REST API to edit car data in carsMockData
 app.put("/edit", (req, res) => {
   const carIdToEdit = req.body.id;
   let resVal = {
     status: 500,
     message: "Car not found",
   };
   const carToEdit = carsMockData.filter(
     (cardData) => cardData.id === carIdToEdits
   );
 
   if (carToEdit) {
     resVal = {
       status: 200,
       res: carToEdit,
     };
   }
 
   res.json(resVal);
 });
 
 // REST API to delete car data from carsMockData
 app.delete("/delete", (req, res) => {
   const carIdToDelete = req.body.id;
   let resVal = {};
   const dataLength = carsMockData.length;
 
   carsMockData = carsMockData.filter((carData) => carData.id !== carIdToDelete);
 
   if (carsMockData.length === dataLength) {
     resVal = { status: 500, message: "item does not exist" };
   } else {
     resVal = {
       status: 200,
       message: " deleted woHooooooooõ",
       res: carsMockData,
     };
   }
 
   res.json(resVal);
 });
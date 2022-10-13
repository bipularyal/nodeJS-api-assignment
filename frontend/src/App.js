import React, { useState,useEffect } from 'react';
import './App.css';

function Cars() {
/**
 * Fields required for the car
      "id",
      "brand",
      "name",
      "releaseYear",
      "color"
 */
  const carFormInitialData = {
    id: "",
    name: "",
    brand: "",
    releaseYear: "",
    color: ""
  }
  const [carFormData, setCarFormData] = useState(carFormInitialData);
  const [cars, setCars] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    /**
     * Gather all the form data to state variable carFormData
     * When the form is submitted POST the data to Backend using fetch post
     * https://googlechrome.github.io/samples/fetch-api/fetch-post.html
     */
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8080/save", {
      method: "POST",
      body: JSON.stringify(carFormData),
      headers: { "Content-Type": "application/json" },
    });
    // only refresh if the data is submitted to the backend and new data is added object . no need to refresh else 
    const responseJSON = await response.json();
    if (responseJSON.status === 200) {
      setRefresh(!refresh);
      setCarFormData(carFormInitialData);
  }
  }
  const handleDelete = async (carID) => {
    /**
     * When clicked on a delete button, get the id of the car's delete button clicked
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */

    const response = await fetch("http://localhost:8080/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id: carID,
      }),
      headers: { "Content-Type": "application/json" },
    })
    const responseJson = await response.json();
    if (responseJson.status === 200) {
      setRefresh(!refresh);
    }
    
  }

/** 🥳🥳🥳🥳🥳🥳 DOUBLE BONUS POINTS 🥳🥳🥳🥳🥳🥳 */
  const handleEdit = () => {
    /**
     * When clicked on a edit button figure out a way to edit the car data.
     * Once edited send the updated data to NodeJS.
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
  }
  
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch("http://127.0.0.1:8080/cars-data");
      const data = await response.json();
      setCars(data);
    };
   fetchApi()  
  },[refresh]);


 
  return (
    <div className='cars-from-wrapper'>
      <form id="cars-form" onSubmit={handleSubmit} autoComplete="off">
        {/** 
           * TODO: Update the form fields with inputs for 
           *    ID, Brand, Name, ReleaseYear and Color
           * Make required changes to  const carFormInitialData
           * */}  
                <label>
          ID:
          <input
            name="id"
            type="text"
            value={carFormData.id}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Brand:
          <input
            name="brand"
            type="text"
            value={carFormData.brand}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Name:
          <input
            name="model"
            type="text"
            // value={carFormData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Release Year:
          <input
            name="releaseYear"
            type="text"
            value={carFormData.releaseYear}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Color:
          <input
            name="color"
            type="text"
            value={carFormData.color}
            onChange={handleInputChange}
            required
          />
        </label>
        <input type="submit" value={`${updateStatus ? "Update" : "Submit"}`} />
      </form>
       {/** 
           * TODO: Update the code below to see any new proprties added to carFormData
           * */}  
      <p>ID:{carFormData.id}, name:{carFormData.name}</p>

      <h2>Cars Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Release Year</th>
            <th>Color</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
          {/** 
           * TODO: Replace this code with Data from Node JS GET api data
           * React documentation: https://reactjs.org/docs/lists-and-keys.html
           * How to get data from API: https://www.w3schools.com/jsref/api_fetch.asp
           * */}          
          <tbody>
          {cars.map((carData) => (
              <tr key={carData.id + 1}>
                <td>{carData.id}</td>
                <td>{carData.brand}</td>
                <td>{carData.model}</td>
                <td>{carData.releaseYear}</td>
                <td>{carData.color}</td>
                <td className="btn" onClick={() => handleEdit(carData.id)}>
                  ✎
                </td>
                <td className="btn" onClick={() => handleDelete(carData.id)}>
                  🗑
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Cars; 



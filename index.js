const dns = require("dns");

// Force IPv4 DNS 
// DNS issue when connecting to MongoDB on home internet, quick fix by forcing IPv4 instead of IPv6
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes.js');
const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); 

// Connection String
const DB_NAME = "db_comp3133_restaurant"
const DB_USER_NAME = 'matthewmacalalad_db_user'
const DB_PASSWORD = 'b7grK8lViyuR1xDl'
const CLUSTER_ID = 'hscra8e'
const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

async function connectToMongoDB(connectionString = DB_CONNECTION) {
  await mongoose.connect(connectionString);
}

app.use("/restaurants", restaurantRouter);

app.listen(SERVER_PORT, async () => { 
  console.log('Server is running...') 
  try {
    await connectToMongoDB(DB_CONNECTION);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});
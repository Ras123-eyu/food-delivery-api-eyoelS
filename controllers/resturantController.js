import Restaurant from "../models/Restaurant.js";

const addRestaurant = async (req, res) => {
  const restaurant = new Restaurant(req.body);
  await restaurant.save();
  res.status(201).json(restaurant);
};

const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.json(restaurants);
};

const getRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant)
    return res.status(404).json({ message: "Restaurant not found" });
  res.json(restaurant);
};

const updateRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!restaurant)
    return res.status(404).json({ message: "Restaurant not found" });
  res.json(restaurant);
};

const deleteRestaurant = async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ message: "Restaurant deleted" });
};

export {
  addRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

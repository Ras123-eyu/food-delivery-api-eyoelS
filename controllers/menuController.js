import MenuItem from "../models/MenuItem.js";

const addMenuItem = async (req, res) => {
  const menuItem = new MenuItem({ ...req.body, restaurantId: req.params.id });
  await menuItem.save();
  res.status(201).json(menuItem);
};

const getMenuItems = async (req, res) => {
  const menuItems = await MenuItem.find({ restaurantId: req.params.id });
  res.json(menuItems);
};

const getMenuItem = async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);
  if (!menuItem)
    return res.status(404).json({ message: "Menu item not found" });
  res.json(menuItem);
};

const updateMenuItem = async (req, res) => {
  const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!menuItem)
    return res.status(404).json({ message: "Menu item not found" });
  res.json(menuItem);
};

const deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Menu item deleted" });
};

export {
  addMenuItem,
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
};

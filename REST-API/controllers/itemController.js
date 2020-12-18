const { itemModel } = require("../models");

function getItems(req, res, next) {
  itemModel
    .find()
    .populate("userId")
    .then(items => res.json(items))
    .catch(next);
}

function getDetails(req, res, next) {
  const { itemId } = req.params;

  itemModel
    .findById(itemId)
    .populate("userId")
    .then(item => res.json(item))
    .catch(next);
}

function createItem(req, res, next) {
  const { title, imageURL, description } = req.body;
  const { _id: userId } = req.user;

  itemModel
    .create({ title, imageURL, description, peopleWhoIncremented: [userId], userId })
    .then(item => {
      res.status(200).json(item);
    })
    .catch(next);
}

function increment(req, res, next) {
  const itemId = req.params.itemId;
  const { _id: userId } = req.user;
  itemModel
    .findByIdAndUpdate({ _id: itemId }, { $addToSet: { peopleWhoIncremented: userId } }, { new: true })
    .then(updatedItem => {
      res.status(200).json(updatedItem);
    })
    .catch(next);
}

module.exports = {
  getItems,
  createItem,
  getDetails,
  increment
};

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // convert to try/catch
  Category.findAll({include : [Product]})
    .then(categories => res.json(categories))
      .catch(err => res
        .status(500)
          .json(err));
});

router.get('/:id', async (req, res) => {
  // convert to try/catch
  const data = await Category.find({id}, {include: [Product]})
  res.json(data);
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCatById = await Category.update(req.body, {where: {id: req.params.id}});
    if (!updateCatById) {
      res.status(400).json({message: 'No user with this id!'});
    } else {
      res.status(200).json(updateCatById);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

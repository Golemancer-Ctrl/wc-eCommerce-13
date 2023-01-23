const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try {
    Tag.findAll({ include : [Product, {
      through: ProductTag,
      model: Tag,
    }]})
      .then(tags => res.json(tags))
  } catch (err) {
    res.status(500).json(err);
  }        
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    Tag.findOne({where: {id: req.params.id}}, { include : [Product, {
      through: ProductTag,
      model: Tag,
    }]})
      .then(tags => res.json(tags))
  } catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagById = await Tag.update(req.body, {where: {id: req.params.id}});
    if (!updateTagById) {
      res.status(400).json({message: 'No tag with this id!'});
    } else {
      res.status(200).json(updateTagById);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

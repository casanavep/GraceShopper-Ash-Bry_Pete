const {
  getAllCategories,
  createCategory,
  getCategoryByID,
  getCategoryByPlatform,
  destroyCategory,
} = require("../db/categories");

const categoryRouter = require("express").Router();

//get all categories
categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.send(categories);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
//create new category
categoryRouter.post("/", async (req, res, next) => {
  try {
    const { platform, console_type } = req.body;
    const newCategory = await createCategory(platform, console_type);
    res.send(newCategory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// get category by ID
categoryRouter.get("/categoryid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryByID(id);
    if (!category) {
      res.status(404).send(`No category with the ID ${id} exists`);
    }
    res.send(category);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//get category by platform
categoryRouter.get("/platform/:platform", async (req, res, next) => {
  try {
    const { platform } = req.params;
    const category = await getCategoryByPlatform(platform);
    if (category.length === 0) {
      res.status(404).send(`We do not have ${platform} games or products`);
    }
    res.send(category);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//delete category
categoryRouter.delete("/categoryid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const resp = await destroyCategory(id);
    if (resp.length === 0) {
      res.status(404).send(`Category with ID ${id} does not exist`);
    }
    res.send(resp);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = categoryRouter;

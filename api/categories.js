const {
  getAllCategories,
  createCategory,
  getCategoryByID,
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
categoryRouter.get("/:id", async (req, res, next) => {
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

module.exports = categoryRouter;

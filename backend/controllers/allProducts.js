import AllProductModel from "../model/allProducts.js";
import "../db connection/mongoo.js";

// Posting all products =======================================>
const addAllProduct = async (req, res) => {
  try {
    const arr = req.body;
    // console.log(arr);
    arr.map(async (obj, index) => {
      await AllProductModel.create({
        ProdectImage: obj.ProdectImage,
        Company: obj.Company,
        Model: obj.Model,
        Productprice: obj.Productprice,
        ProductColor: obj.ProductColor,
        Heaadphonetype: obj.Heaadphonetype,
        Productheadline: obj.Productheadline,
        Aboutitem: obj.Aboutitem,
        ratings: obj.ratings,
        Available: obj.Available,
      });
    });
    res.status(200).send({
      message: "all products data has been added",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "all products data has not been added",
    });
  }
};

// getting all products / based on filters <===========================>
const getProduct = async (req, res) => {
  try {
    console.log("req.query", req.query);

    let filters = {};
    if (req.query.all) {
      // Handle filtering
      if (req.query.all.Select_Headphone_Type) {
        filters.Heaadphonetype = {
          $regex: new RegExp(req.query.all.Select_Headphone_Type, "i"),
        };
      }

      if (req.query.all.Company) {
        filters.Company = { $regex: new RegExp(req.query.all.Company, "i") };
      }

      if (req.query.all.Colour) {
        filters.ProductColor = {
          $regex: new RegExp(req.query.all.Colour, "i"),
        };
      }

      if (req.query.all.Price) {
        const priceRange = req.query.all.Price.split("-");
        filters.Productprice = {
          $gte: parseFloat(priceRange[0]),
          $lte: parseFloat(priceRange[1]),
        };
      }

      // Handle sorting
      let sortOption = {};
      if (
        req.query.all.Sort_by &&
        req.query.all.Sort_by !== "Sort_by_Feature"
      ) {
        if (req.query.all.Sort_by === "Highest") {
          sortOption["Productprice"] = -1; // Sort by price in descending order
        } else if (req.query.all.Sort_by === "Lowest") {
          sortOption["Productprice"] = 1; // Sort by price in ascending order
        } else if (req.query.all.Sort_by === "A-Z") {
          sortOption["Model"] = 1; // Sort alphabetically by Model in ascending order
        } else if (req.query.all.Sort_by === "Z-A") {
          sortOption["Model"] = -1; // Sort alphabetically by Model in descending order
        }
      }
      // MongoDB query
      console.log("filters;-", filters);
      const results = await AllProductModel.find(filters).sort(sortOption);
      res.status(200).json(results);
    } else {
      const results = await AllProductModel.find();
      res.status(200).json(results);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// geting product by id =======================================

const ById = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await AllProductModel.find({ _id }, { __v: 0 });
    if (product) {
      return res
        .status(200)
        .send({ IsFound: true, message: "item found", product });
    } else {
      return res
        .status(404)
        .send({ IsFound: false, message: "item not found", product });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to get product by its _id" });
  }
};

export { addAllProduct, getProduct, ById };

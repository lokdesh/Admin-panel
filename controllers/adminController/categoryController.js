const Category = require("../../models/adminModels/categoryModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");


exports.CreateCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.create(req.body);
    res.status(200).json({
        status: "success",
        category,
    });
});

exports.AllCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});

exports.GetCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorHandler("Category not found", 404));
    }   
    res.status(200).json(category);
});

exports.UpdateCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorHandler("Category not found", 404));
    }
    category.parentCategory = req.body.parentCategory;
    category.sortOrder = req.body.sortOrder;
    category.showInMenu = req.body.showInMenu;
    category.showInChild = req.body.showInChild;
    category.englishName = req.body.englishName;
    category.hindiName = req.body.hindiName;
    category.startingAlphabet = req.body.startingAlphabet;
    category.categoryUrl = req.body.categoryUrl;
    category.metaTitle = req.body.metaTitle;
    category.metaDescription = req.body.metaDescription;
    await category.save();
    res.status(200).json({
        status: "success",
        category,
    });
});

exports.DeleteCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorHandler("Category not found", 404));
    }
    await category.remove();
    res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
    });
});

exports.GetCategoryByName = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findOne({categoryUrl: req.params.name}).populate('news');
    if (!category) {
        return next(new ErrorHandler("Category not found", 404));
    }   
    res.status(200).json(category);
});


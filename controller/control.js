const CATEGORY = require('../model/category')


//=======================all Content============================
exports.ALLCONTENT = async function(req, res, next) {
    try {
        const allContent = await CATEGORY.find()
        res.status(200).json({
            status : "sucessfully",
            message : "data is found",
            data : allContent
        })
    } catch (error) {
        res.status(404).json({
            status : "No any content",
            message : error.message
        })
    }
};


//=======================add Content============================
exports.ADDCONTENT= async function(req, res, next) {
    try {
        if(!req.body.name || !req.body.image){
            throw new Error("Please add field")
        }
        const data = await CATEGORY.create(req.body)
        res.status(201).json({
            status : "sucessfully",
            message : "content is added",
            content : data
        })
    } catch (error) {
        res.status(404).json({
            status : "fail",
            message : error.message
    })
  }
};


//=======================Update Content============================
exports.UPDATECONTENT =  async function(req, res, next) {
    try {
      await CATEGORY.findByIdAndUpdate(req.query.id,req.body)
        res.status(200).json({
            status : "sucessfully",
            message : "Content is updated",
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
    })
  }
};

//=======================delete Content============================
exports.DELETCONTENT = async function(req, res, next) {
    try {
      await CATEGORY.findByIdAndDelete(req.query.id)
        res.status(200).json({
            status : "sucessfully",
            message : "Content is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
    })
  }
};



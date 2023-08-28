const CATEGORY = require('../model/category')
const QUESTION = require('../model/question')

//=======================add Question============================
exports.ADDQUESTIONS = async function (req, res, next) {
    try {
        console.log(req.body);
        if (!req.body.question || !req.body.options || !req.body.answer) {
            throw new Error("please enter valid field")
        }
        var ops = req.body.options
        if (ops.length < 1) {
            throw new Error("please enter minimum two options")
        }
        const checkCat = await CATEGORY.findById(req.body.category)
        if (!checkCat) {
            throw new Error("content in not allow")
        }
        const checkAns = ops.includes(req.body.answer)
        if (checkAns === false) {
            throw new Error("please enter valid answer from options")
        }
        const data = await QUESTION.create(req.body)
        res.status(200).json({
            status: "Done",
            message: "Thank you",
            data : data
        })
    } catch (error) {
        res.status(401).json({
            status: "Unauthenticated",
            message: error.message
        })
    }
};

//=======================all Question============================
exports.ALLQUESTIONS = async function (req, res, next) {
    try {
        const allQuestion = await QUESTION.find()
        res.status(200).json({
            status: "sucessfully",
            message: "data is found",
            data: allQuestion
        })
    } catch (error) {
        res.status(404).json({
            status: "No any data",
            message: error.message
        })
    }
};


//=======================Update Question============================
exports.UPDATEQUESTION = async function (req, res, next) {
    try {
        const getData = await QUESTION.findById(req.params.id)
        var data = {...getData._doc, ...req.body}
        // console.log("ops", data);
        const ops = data.options
        // console.log(ops, data.answer);
        // return res.send("test")
        if (ops.length < 1) {
            throw new Error("please enter minimum two options")
        }
        const checkCat = await CATEGORY.findById(data.category)
        if (!checkCat) {
            throw new Error("content in not allow")
        }
        const checkAns = ops.includes(data.answer)
        if (checkAns === false) {
            throw new Error("please enter valid answer from options")
        }
        await QUESTION.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            status: "sucessfully",
            message: "question is updated",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};


//=======================Delete Question============================
exports.DELETQUESTION = async function (req, res, next) {
    try {
        await QUESTION.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "sucessfully",
            message: "question is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};


//=======================Search Question============================
exports.SEARCH = async function (req, res, next) {
    try {
        const data = await QUESTION.find({category: {$eq: req.params.id}})
        res.status(200).json({
            status: "sucessfully",
            message: "Data is found",
            data : data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};


//=======================all Data============================
exports.ALLDATA = async function (req, res, next) {
    try {
        const allQuestion = await QUESTION.find().populate('category')
        res.status(200).json({
            status: "sucessfully",
            message: "data is   found",
            data: allQuestion
        })
    } catch (error) {
        res.status(404).json({
            status: "No any data",
            message: error.message
        })
    }
};
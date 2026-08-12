const userRegisterModel = require("../models/userRegisterSchema")
const status = require('http-status-codes')

const getDataApi = async (req, res) => {
    try {
        const { email } = req.user
        console.log(email)

        const data = await userRegisterModel.find({ email })

        return res.status(200).json({ Message:"Authentication Success" })

    } catch (error) {
        console.log("Get API ERROR", error);
        return res.status(401).json({ Message: "GET Api Error" })
    }
}

module.exports = getDataApi
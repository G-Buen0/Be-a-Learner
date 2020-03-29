const connection = require('../database/connection')

module.exports = {
    async retrieveSpecifcClass(req,res){
        const school_id = req.headers.authorization

        const classes = await connection('classes')
            .where('school_id', school_id)
            .select('*')

        return res.json(classes)
    }
}
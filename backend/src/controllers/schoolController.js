const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {

    async createSchool(req, res){
        const { name, email, whatsapp, city, uf } = req.body
    
        const id = crypto.randomBytes(4).toString('HEX')
    
        await connection('schools').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({ id })
    },
    
    async retrieveSchool(req, res){
        const schools = await connection('schools').select('*')
    
        return res.json(schools)
    }
}
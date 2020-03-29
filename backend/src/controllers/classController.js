const connection = require('../database/connection')

module.exports = {

    async retrieveClass(req, res){
        const { page = 1 } = req.query

        const [count] = await connection('classes').count()

        const classes = await connection('classes')
            .join('schools', 'schools.id', '=', 'classes.school_id')
            .limit(5)
            .offset((page - 1)*5)
            .select([
                'classes.*', 
                'schools.name', 
                'schools.email', 
                'schools.whatsapp', 
                'schools.city', 
                'schools.uf'
            ])

        res.header('X-Total-Count', count['count(*)'])

        return res.json(classes)
    },

    async createClass(req,res){
        const { title, description, value } = req.body
        const school_id = req.headers.authorization

        const [id] = await connection('classes').insert({
            title,
            description,
            value,
            school_id
        })

        return res.json({ id })
    },

    async deleteClass(req, res){
        const { id } = req.params
        const school_id = req.headers.authorization

        const Class = await connection('classes')
            .where('id', id)
            .select('school_id')
            .first()

        if(Class.school_id != school_id){
            return res.status(401).json({ error: 'Operation not permitted' })
        }

        await connection('classes').where('id', id).delete()

        return res.status(204).send()
    }
}
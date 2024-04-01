const Router = require('express').Router();
const User = require('../../model/User');

Router
    .get('/', async (req, res) => {
        const { first_name, last_name } = req.query;
        if(!first_name || !last_name) return res.status(400).send("Please send a valid query");
        try {

            // Constructing a syntax for searching parameters in which 
            // $and means that if first_name and last_name exists at the same time
            // then it would return those users which contain both the searching params
            const search = {
                $and: []
            };

            // $regex is used for partial matching of searching parameters
            if (first_name) search.$and.push({ first_name: { $regex: new RegExp(first_name, 'i') } });
            if (last_name) search.$and.push({ last_name: { $regex: new RegExp(last_name, 'i') } });
            
            const user = await User.find(search);

            res.status(200).json({
                results: user.length,
                user
            });
        } catch (error) {
            res.status(500).send("Error fetching users");
            console.log(error);
        }
    })

module.exports = Router;
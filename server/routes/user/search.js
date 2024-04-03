const Router = require('express').Router();
const User = require('../../model/User');

Router
    .get('/', async (req, res) => {
        const { first_name, last_name } = req.query;

        // Get the page number from the query and convert it to int if an string is passed it will send invalid page no.
        const page = parseInt(req.query.page);
        if (!page || page < 1) return res.status(400).send("Invalid Page number");
        const pageSize = 20;
        const skip = (page - 1) * pageSize;

        try {
            // Constructing a syntax for searching parameters in which 
            // $and means that if first_name and last_name exist at the same time
            // then it would return those users which contain both the searching params
            const search = {
                $and: []
            };

            // $regex is used for partial matching of searching parameters
            if (first_name) search.$and.push({ first_name: { $regex: new RegExp(first_name, 'i') } });
            if (last_name) search.$and.push({ last_name: { $regex: new RegExp(last_name, 'i') } });

            let users;
            let totalUsers;
            if (first_name.length === 0) {
                totalUsers = await User.countDocuments();
                users = await User.find()
                    .skip((page - 1) * pageSize)
                    .limit(pageSize);
            }
            else {
                users = await User.find(search).skip(skip).limit(pageSize);
                totalUsers = await User.countDocuments(search);
            }
            const totalPages = Math.ceil(totalUsers / pageSize);
            
            if (page < 1 || page > totalPages) return res.status(400).send("Invalid Page number");

            res.status(200).json({
                currentPage: page,
                totalPages,
                pageSize,
                users
            });
        } catch (error) {
            res.status(500).send("Error fetching users");
            console.log(error);
        }
    })


module.exports = Router;
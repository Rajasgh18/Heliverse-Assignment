const Router = require('express').Router();
const User = require('../../model/User');

Router
    .get('/', async (req, res) => {
        const { domain, gender, available } = req.query;

        const page = parseInt(req.query.page);
        if (!page || page < 1) return res.status(400).send("Invalid Page number");
        const pageSize = 20;
        const skip = (page - 1) * pageSize;

        try {
            // adding filter parameters which is given in the query
            const filter = {};
            if (domain)
                filter.domain = domain[0].toUpperCase() + domain.substring(1,).toLowerCase();
            if (gender)
                filter.gender = gender[0].toUpperCase() + gender.substring(1,).toLowerCase();
            if (available)
                filter.available = available.toLowerCase();

            // returns data accoding to the applied filter
            const users = await User.find(filter).skip(skip).limit(pageSize);
            const totalUsers = await User.countDocuments(filter);

            const totalPages = Math.ceil(totalUsers / pageSize);

            if (page < 1 || page > totalPages) return res.status(400).send("Invalid Page number");

            res.status(200).json({
                currentPage: page,
                totalPages,
                pageSize,
                users
            });

        } catch (error) {
            console.log(error);
            res.status(500).send("Error fetching users");
        }
    })

module.exports = Router;
const Router = require('express').Router();
const User = require('../../model/User');

Router
    .get('/', async (req, res) => {
        const { domain, gender, available } = req.query;
        if(!domain || !gender || !available) return res.status(400).send("Please send a valid query");
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
            const users = await User.find(filter);

            res.status(200).json({
                results: users.length,
                users
            });

        } catch (error) {
            console.log(error);
            res.status(500).send("Error fetching users");
        }
    })

module.exports = Router;
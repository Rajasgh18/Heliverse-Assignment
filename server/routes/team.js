const Router = require('express').Router();
const mongoose = require('mongoose');
const Team = require('../model/Team');
const User = require('../model/User');

Router

    // Fetching team with id
    .get('/:id', async (req, res) => {
        try {
            // Checking if Id is valid
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Team Id is not valid");

            // Fetching team with the id
            const team = await Team.findById(req.params.id);
            if (!team) return res.status(404).send("No Team found");

            // The below lines are not required if populate function is used
            // but i don't know i am getting some errors so i had to manuallt fetch the users
            const memberIds = team.members; 
            const members = await User.find({ _id: { $in: memberIds } });

            // Replace member IDs with user objects
            team.members = members;

            // Send the populated team object in the response
            res.status(200).json(team);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error while fetching teams");
        }
    })

    // Fetching all the temas
    .get('/', async (req, res) => {
        try {
            const teams = await Team.find();
            res.status(200).json({
                results: teams.length,
                teams
            });
        } catch (error) {
            res.status(500).send("Error while fetching teams");
        }
    })

    // Adding new Team
    .post('/', async (req, res) => {
        const { name, members } = req.body;

        // Checking if name is provided or not
        if (!name) return res.status(400).send("Please enter name");
        try {

            // Creating arrays for checking uniqueness in domains and users
            let domains = [];
            let userIds = [];

            for (const user of members) {
                // Checking if user details are provided correctly
                if (!mongoose.Types.ObjectId.isValid(user._id) || !user.domain) return res.status(400).send("Please enter user details properly");

                // Checking if user provided exists or not
                const validUser = await User.findById(user._id);
                if (!validUser) return res.status(400).send("Some members doesn't exists as users");

                // Checking if the users are same
                const checkUniqueUsers = userIds.filter(id => id === user._id);
                if (checkUniqueUsers.length !== 0) return res.status(400).send("One or more users are have same userIds");

                // Checking if domains or users don't match i.e. unique
                const checkDomainUnique = domains.filter(domain => domain === user.domain);
                if (checkDomainUnique.length !== 0) return res.status(400).send("One or more users doesn't have unique domains");
                if (!user.available) return res.status(400).send("One or more users are not available");

                userIds.push(user._id);
                domains.push(user.domain);

            }

            // Creating new Team
            let team = await Team({ name, members: userIds });
            team = await team.save();

            res.status(200).json(team);
        } catch (error) {
            res.status(500).send("Error while adding team");
            console.log(error);
        }
    })

module.exports = Router;
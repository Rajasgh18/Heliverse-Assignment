const Router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../../model/User');
const { body, validationResult } = require('express-validator');

Router

    // Get user using ID
    .get('/:id', async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("Invalid User ID format");

        try {
            let user = await User.findById(req.params.id);
            if (!user) return res.status(404).send("There exists no user with this ID");

            user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send("Error in fetching user with id");
            console.e(error);
        }
    })

    // Get all users with pagination support
    .get('/', async (req, res) => {
        // Get the page number from the query and convert it to int if an string is passed it will send invalid page no.
        const page = parseInt(req.query.page);
        if (!page) return res.status(400).send("Invalid Page number");
        const pageSize = 20;

        try {
            const totalCount = await User.countDocuments();
            const totalPages = Math.ceil(totalCount / pageSize);

            if (page < 1 || page > totalPages) return res.status(400).send("Invalid Page number");

            const users = await User.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            res.status(200).json({
                currentPage: page,
                totalPages,
                pageSize,
                users,
            })

        } catch (error) {
            res.status(500).send("Error in fetching user with pages");
            console.log(error);
        }
    })

    // Adding user
    .post('/', [
        body('first_name', 'Please enter minimum 2 letters').isLength({ min: 2 }),
        body('last_name', 'Please enter minimum 2 letters').isLength({ min: 2 }),
        body('email', 'Please enter a valid email').isEmail(),
        body('available', 'Please enter your availability').isLength({ min: 1 }),
        body('domain', 'Please enter your domain correctly').isLength({ min: 2 }),
        body('gender', 'Please enter your gender').isLength({ min: 1 }),
    ], async (req, res) => {
        try {
            // Checks for the specified condition if some fields are not properly filled then it sends which condition is not met
            let errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            // Checks whether another user with the provided email exists or not
            let user = await User.findOne({ email: req.body.email });
            if (user) return res.status(400).send("User already exists with this email");

            // If everything is fine then creates a new user and saves it to the database
            user = new User({ ...req.body });
            await user.save()

            res.status(200).send("User data saved successfully");

        } catch (error) {
            res.status(500).send("Error occured while adding user");
            console.log(error)
        }
    })

    // Update user using ID
    .put('/:id', [
        body('first_name', 'Please enter minimum 2 letters').optional().isLength({ min: 2 }),
        body('last_name', 'Please enter minimum 2 letters').optional().isLength({ min: 2 }),
        body('email', 'Please enter a valid email').optional().isEmail(),
        body('available', 'Please enter your availability').optional().isLength({ min: 1 }),
        body('domain', 'Please enter your domain correctly').optional().isLength({ min: 2 }),
        body('gender', 'Please enter your gender').optional().isLength({ min: 1 }),
    ], async (req, res) => {
        // Checks for the specified condition if some fields are not properly filled then it sends which condition is not met
        let errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("Invalid User ID format");

        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).send("There exists no user with this ID");

            await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).send("Updated User info successfully");
        } catch (error) {
            res.status(500).send("Error occured while updating user");
            console.log(error);
        }
    })

    // Delete user using ID
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("Invalid User ID format");

        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).send("There exists no user with this ID");

            await User.findByIdAndDelete(req.params.id);
            res.status(200).send("User deleted successfully");
        } catch (error) {
            res.status(500).send("Error occured while deleting user");
            console.log(error);
        }
    })

module.exports = Router;
const express = require('express');
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/user');
const dotenv = require('dotenv');
const {getUsersByRole} = require('../models/user');

dotenv.config();

const router = express.Router();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Email and password are required");
      return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log("Login request received for email:", email);

    const user = await findUserByEmail(email);

    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: 'Cannot find user' });
    }

    console.log("User found:", user);

    if (password === user.PASSWORD) {
      const userForToken = { email: user.EMAIL, role: user.ROLE };
      const accessToken = jwt.sign(userForToken, accessTokenSecret, { expiresIn: '1h' });

      const response = { accessToken, role: user.ROLE };
      if (user.ROLE === 'student') {
        response.major = user.MAJOR;
      }

      console.log("Login successful for user:", email);
      res.json(response);
    } else {
      console.log("Invalid password for user:", email);
      res.status(403).json({ message: 'Not Allowed' });
    }
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/admins', async (req, res) => {
    try {
      const admins = await getUsersByRole('admin');
      res.json(admins);
    } catch (error) {
      console.error("Error fetching admins:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  router.get('/superadmins', async (req, res) => {
    try {
      const superadmins = await getUsersByRole('superadmin');
      res.json(superadmins);
    } catch (error) {
      console.error("Error fetching superadmins:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
module.exports = router;

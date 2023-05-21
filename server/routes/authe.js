const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = '1cf680c2a6730762aad6590e794b51ae20f9243953bacfed6505d16f505c1adf';
const router = express.Router();
const User = require("../model/User")


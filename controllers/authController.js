const authControllers=require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


authControllers.post('/register', 
 async (req, res) => {
 
  try { 
    const { username, email, password, city, isAdmin } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required and must be a string' });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: 'Invalid password format' });
  }
  const existingUser = await User.findOne({ email:email });
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists,Try new one' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      username,
      email,
      password:hashedPassword,
      city,
      isAdmin ,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id.toString(),isAdmin:user.isAdmin }, process.env.key,{expiresIn: '2h' });
    res.status(200).json({ msg: 'The new user has been registered', registeredUser: user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
authControllers.post('/login',async (req, res) => {
  try {
    const { email, password} = req.body;
    const user = await User.findOne({email:email});
    if (!user || !(await bcrypt.compare(password,user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: user._id.toString(),isAdmin:user.isAdmin },process.env.key, {expiresIn: '2h' });

    res.status(200).json({ msg: 'Login successful!', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authControllers.post('/logout',async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();

    res.status(200).json({ msg: 'User has been logged out' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = authControllers ;

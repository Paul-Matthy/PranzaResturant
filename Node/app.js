const express = require('express')      // import express package
const morgan = require('morgan')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const uuid = require('uuid')
const db = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();
const nodemailer = require('nodemailer');
const JWT_SECRET = process.env.JWT_SECRET;

// create express app
const app = express()

const PORT = process.env.PORT || 3000

//  // middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log('Entered')

  next()
})

app.use(cors({
  origin: ["http://127.0.0.1:5500"],
  credentials: true
}))

app.post('/signup', async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body

  try {

    if (!first_name) throw Error('Insert First Name')
    if (!last_name) throw Error('Insert Last Name')
    if (!username) throw Error('Insert Username')
    if (!email) throw Error('Insert Email')
    if (!password) throw Error('Insert Password')

    const id = uuid.v4();        // generate id
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //  create sql statement
    let sql = `INSERT INTO signup(
            id, first_name, last_name, username, email, password)
             VALUES('${id}', '${first_name}', '${last_name}', '${username}', '${email}', '${hash}')`


    await db.execute(sql)   // execute sql statement


    res.status(200).json({ message: 'Signup Successfull' })
  } catch (error) {
    res.status(400).json({ erorr: error.message })
  }
})


app.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if either username or email is provided
    if (!username && !email) {
      throw new Error('Please provide either username or email');
    }

    // Build the query based on provided username or email
    let query = '';
    if (username) {
      query = `SELECT * FROM signup WHERE username='${username}'`;
    } else if (email) {
      query = `SELECT * FROM signup WHERE email='${email}'`;
    }

    // Execute the query
    const [rows] = await db.execute(query);

    // Check if user exists in the database
    if (rows.length === 0) {
      throw new Error('User not found');
    }

    // Verify the password
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }


    // Password is valid, generate a JWT
    const token = jwt.sign({ userId: user.id, username: user.username, email: user.email }, 'JWT_SECRET', { expiresIn: '1h' });


    // Password is valid, return success message or user data
    res.status(200).json({ token: token, id: user.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;

  try {
    // Check if authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authorization header');
    }

    const token = authHeader.substring(7); // Extract the token from the authorization header

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the decoded token matches the requested user ID
    if (decoded.id !== id) {
      throw new Error('Unauthorized access');
    }

    // Fetch user information from the database based on the provided ID
    const [user] = await db.execute('SELECT * FROM signup WHERE id = ?', [id]);

    // Check if user exists in the database
    if (user.length === 0) {
      throw new Error('User not found');
    }

    const { first_name, last_name, username, email } = user[0];
    res.status(200).json({ id, first_name, last_name, username, email });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});




router.post('/send-email', async (req, res) => {
  const { username, email, subject, message } = req.body;

  try {
    // Create a transporter using SMTP settings or other email service configuration
    const transporter = nodemailer.createTransport({
      // Configure your email service provider settings here
      service: 'Gmail',
      auth: {
        user: 'paulmatthy900@gmail.com',
        pass: 'Shekwoinagami123'
      }
    });

    // Define the email options
    const mailOptions = {
      from: 'your-email@example.com',
      to: 'recipient-email@example.com',
      subject: subject,
      text: `
        From: ${username}
        Email: ${email}
        Message: ${message}
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;


app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
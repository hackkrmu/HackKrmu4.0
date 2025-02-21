const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = 5500;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/api/login', async function(req, res) {
  try {
    var username = req.body.username;
    var password = req.body.password;
    const data = readJson();
    console.log('Loaded data:', data);
    console.log('Username:', username, 'Password:', password);

    const user = data.users.find(user => user.username === username && user.password === password);

    if (user) {
      console.log('Login successful for:', username);
      res.redirect('/index.html');
      console.log('Redirect successful for:', username);
    } else {
      console.log('Login failed for:', username);
      res.send(`<script>alert('Invalid credentials'); window.location.href = '/login.html';</script>`);    
  }
}
   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});


const filePath = path.join(__dirname, 'data.json');

function readJson() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return { users: [] }; 
  }
}

function writeJson(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing JSON file:', err);
  }
}

function saveUser(username, password) {
  const data = readJson();

  const userExists = data.users.some(user => user.username === username);
  if (userExists) return false;

  data.users.push({ username, password });
  writeJson(data);
  return true;
}

app.post('/api/register', async function(req, res) {
  try {
    var username = req.body.username;
    var password = req.body.password;
    
    if (!username || !password) {
          return res.status(400).json({ message: 'Username and password are required.' });
        }

    const success = saveUser(username, password);
    if (success) {
      console.log('User registered:', username);
      res.json({ message: 'Registration successful.' });
    } else {
      console.log('Registration failed: Username already exists.');
      res.status(409).json({ message: 'Username already exists.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

app.post('/api/consumer', async function(req, res) {
    try {
      const formData = req.body;

      fs.readFile('data1.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading data file' });

        const existingData = data ? JSON.parse(data) : [];
        existingData.push(formData);

        fs.writeFile('data1.json', JSON.stringify(existingData, null, 2), (err) => {
          if (err) return res.status(500).json({ message: 'Error saving data' });
          res.status(200).json({ message: 'Data saved successfully!' });
    });
  });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error.' });
    }
  });
  
app.post('/api/provider', async function(req, res) {
    try {
        var location = req.body.location;
        var time = req.body.time;
        var issue = req.body.issue;
        var name = req.body.name;
        var contact_num = req.body.contact_num;
        
          console.log("successfully saved to DataBase")
          res.json({ response_from_server: 'successfully saved to DataBase' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error.' });
    }
  });
  
app.post('/api/admin', async function(req, res) {
    try {
        var location = req.body.location;

          console.log("successfully saved to DataBase")
          res.json({ response_from_server: 'successfully saved to DataBase' });

        } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error.' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

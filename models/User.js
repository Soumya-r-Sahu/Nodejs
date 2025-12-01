const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

class User {
  static getAllUsers() {
    try {
      const data = fs.readFileSync(usersFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  }

  static async register(username, password, fullName, email) {
    const users = this.getAllUsers();
    
    // Check if user already exists
    if (users.find(u => u.username === username || u.email === email)) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      fullName,
      email,
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  static async login(username, password) {
    const users = this.getAllUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static getUserById(id) {
    const users = this.getAllUsers();
    return users.find(u => u.id === id);
  }
}

module.exports = User;


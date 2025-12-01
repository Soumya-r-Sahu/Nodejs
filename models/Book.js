const fs = require('fs');
const path = require('path');

const booksFilePath = path.join(__dirname, '../data/books.json');

class Book {
  static getAllBooks() {
    try {
      const data = fs.readFileSync(booksFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static getBookByISBN(isbn) {
    const books = this.getAllBooks();
    return books.find(book => book.isbn === isbn);
  }

  static getBooksByAuthor(author) {
    const books = this.getAllBooks();
    return books.filter(book => 
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  static getBooksByTitle(title) {
    const books = this.getAllBooks();
    return books.filter(book => 
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }
}

module.exports = Book;


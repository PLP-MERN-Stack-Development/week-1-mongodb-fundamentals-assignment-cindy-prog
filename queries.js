//first query to find all books
const Allresults = db.books.find();
printjson(results);

//second query to find books published after 2000
const resultsAfter2000 = db.books.find({ published_year: { $gt: 2000 } });
printjson(resultsAfter2000);
//third query to find books by a specific author
const authorName = 'Harper Lee';
const resultsByAuthor = db.books.find({ author: authorName });
printjson(resultsByAuthor);
//fourth query to update the price of a specific book
const bookTitle = '1925';
const newPrice = 10.80;
const updateResult = db.books.updateOne(
  { title: bookTitle },
  { $set: { price: newPrice } }
);
printjson(updateResult);
// fifth query to delete a book by it's title
const bookToDelete = 'Brave New World';
const deleteResult = db.books.deleteOne({ title: bookToDelete });
printjson(deleteResult);

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

// advanced queries 

// find books that are both in stock and published after 2010
const advancedResults = db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});
printjson(advancedResults);

// use projection to return only the title, author, and price fields in the queries
const projectionResults = db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);
printjson(projectionResults);

//implement sorting to display booksby price (ascending and descending order)
const sortedAsc = db.books.find().sort({ price: 1 });
printjson(sortedAsc);
const sortedDesc = db.books.find().sort({ price: -1 });
printjson(sortedDesc);

//use the limit and skip methods to implement paginations (5 books per page)
const pageSize = 5;
const pageNumber = 3; // Change this to get different pages
const paginatedResults = db.books.find()
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize);
printjson(paginatedResults);

//aggregaton pipeline

// create an aggregation pipeline to calculate the average price of books by genre 
const averagePriceByGenre = db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  },
  {
    $sort: { averagePrice: 1 } // Sort by average price ascending
  }
]);
printjson(averagePriceByGenre);
// create an aggregation pipeline to find the author with the most books in the collection 
const mostBooksByAuthor =db.books.aggregate([
  {
    $group:{
      _id: "$author",
      bookcount: {$sum: 1}
    }
  },
  {
    $sort:{ bookcount: -1} // Sort by book count descending
  },
  {
    $limit: 1 // Get the author with the most books
  }
]);
printjson(mostBooksByAuthor);
// implement a pipeline that groups books by pubblication decade and counts them 
const booksByDecade = db.books.aggregate([ 
  {
    $group : {
      _id: {
        $floor: {$divide: [ "$published_year", 10]}
      },
      count: {$sum: 1}
      }
    }, 
    {
      $project: {
        decade: { $multiply: ["$_id", 10] }, // Convert to decade
        count: 1,
        _id: 0
      }
    },
]);
printjson(booksByDecade);

// indexing 
// create an index on the title field for faster searches
db.books.createIndex({ title: 1 });
// create a compound index on author and published_year 
db.books.createIndex({ author: 1, published_year: -1})


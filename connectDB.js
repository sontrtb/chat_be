const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sontrtb:sontr2011@cluster0.bypm1a7.mongodb.net/?retryWrites=true&w=majority');
}

const Schema = mongoose.Schema

module.exports = Schema;


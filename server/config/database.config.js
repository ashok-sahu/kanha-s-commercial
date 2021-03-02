const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectdb = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8n3ax.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        }
      )
      .then((res) => {
        console.log("database connected successfully!".bold.green);
      });
  } catch (err) {
    console.log(error("error while connect to database!", err.message));
    process.exit(1);
  }
};

module.exports = connectdb;

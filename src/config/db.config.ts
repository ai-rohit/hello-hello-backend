const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  // poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

// let forNow = MONGO_URL="mongodb+srv://prakashpun:shyam12345@merocluster.7awi0.mongodb.net/hello-hello?retryWrites=true&w=majority";
const url: string =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/hello-hello-backend";

export const dbConfig = {
  options,
  url,
};

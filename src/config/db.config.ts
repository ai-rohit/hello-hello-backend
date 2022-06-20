const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  // poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const url =
  process.env.MONGO_URLL || "mongodb://127.0.0.1:27017/hello-hello-backend";

export const dbConfig = {
  options,
  url,
};

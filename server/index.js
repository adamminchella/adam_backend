require("dotenv").config();
const port = process.env.PORT || 3000;

const api = require("./server");

api.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

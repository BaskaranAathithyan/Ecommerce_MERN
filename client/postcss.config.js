const tailwindcss = require("tailwindcss");
module.exports = {
  //add pulgins
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};

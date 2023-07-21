function getCurrentDate() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

function getFormattedDate(dateString) {
  return new Date(dateString).toLocaleString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // Month Day, Year
}

module.exports = { getCurrentDate, getFormattedDate };

export const formatDateIndo = () => {
  const options = {
    day: "2-digit",
    weekday: "long",
    month: "long",
    year: "numeric",
  };
  return new Date().toLocaleDateString("id-ID", options).replace(/\//g, "-");
};

export const getDateToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatTimestamp = (timestamp) => {
  // Create a new Date object
  const date = new Date(timestamp);

  // Extract individual components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Format date and time
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Combine date and time
  return `${formattedDate} ${formattedTime}`;
};

// Example usage
const timestamp = "2024-05-08T08:23:20.000Z";
console.log(formatTimestamp(timestamp)); // Output: "2024-05-08 08:23:20"

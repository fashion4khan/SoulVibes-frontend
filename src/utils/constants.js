export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:7777"
    : "http://13.60.216.177:7777";

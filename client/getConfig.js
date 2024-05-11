export default async function getConfig() {
  try {
    const response = await fetch("config.json");
    if (!response.ok) {
      throw new Error(`HTTP error - status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading the config file", error);
    return null;
  }
}

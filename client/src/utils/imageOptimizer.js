/**
 * Optimizes image URLs by injecting Cloudinary transformation parameters.
 * E.g., converting quality to auto, formatting to webp, and resizing width/height.
 */
export const getOptimizedImageUrl = (url, width = 500) => {
  if (!url || typeof url !== "string") return "/fallback-image.jpg";

  // Check if it's a Cloudinary URL
  if (url.includes("res.cloudinary.com")) {
    const parts = url.split("/upload/");
    if (parts.length === 2) {
      // Inject transformation parameters: w_width, q_auto, f_auto (webp format)
      return `${parts[0]}/upload/w_${width},q_auto,f_auto/${parts[1]}`;
    }
  }

  return url;
};

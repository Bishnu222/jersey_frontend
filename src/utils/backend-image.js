export const getBackenedImageUrl = (imagePath) => {
    if(!imagePath) return null

    const baseUrl = import.meta.env.VITE_BACKENED-URL ||
    "http://localhost:5050"
    return baseUrl + "/" + imagePath
}
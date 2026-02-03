import { useState } from "react";

const IMGBB_API = `https://api.imgbb.com/1/upload`;

export default function useImgbb() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (imageFile) => {
    if (!imageFile) return null;

    setLoading(true);
    setError(null);


    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(
        `${IMGBB_API}?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error("Image upload failed");
      }

      return data.data.display_url; // 🔥 final image url
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
}

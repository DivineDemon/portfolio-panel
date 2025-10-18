import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function imageToUrl(image: string) {
  const formData = new URLSearchParams();
  formData.append("image", image);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PUBLIC_IMGBB_KEY}`, {
      method: "POST",
      body: formData,
    });
    const final = await response.json();

    toast.success("Image Uploaded Successfully!");

    return final.data.image.url;
  } catch (error) {
    toast.error((error as Error).message);
    return "";
  }
}

import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function imageToUrl(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", image as File);

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

export async function resolveProjectFormImages(data: {
  coverImage?: string | FileList;
  galleryImages?: string[] | FileList | (string | FileList)[];
}): Promise<{ coverImage: string | undefined; galleryImages: string[] }> {
  let coverUrl: string | undefined;
  const cover = data.coverImage;
  if (typeof cover === "string" && cover) {
    coverUrl = cover;
  } else if (cover instanceof FileList && cover.length > 0) {
    coverUrl = await imageToUrl(cover[0]!);
  }

  const galleryUrls: string[] = [];
  const gallery = data.galleryImages;
  if (Array.isArray(gallery)) {
    for (const item of gallery) {
      if (typeof item === "string" && item) {
        galleryUrls.push(item);
      } else if (item instanceof FileList && item.length > 0) {
        const url = await imageToUrl(item[0]!);
        if (url) galleryUrls.push(url);
      }
    }
  } else if (gallery instanceof FileList && gallery.length > 0) {
    for (let i = 0; i < gallery.length; i++) {
      const url = await imageToUrl(gallery[i]!);
      if (url) galleryUrls.push(url);
    }
  }

  return { coverImage: coverUrl, galleryImages: galleryUrls };
}

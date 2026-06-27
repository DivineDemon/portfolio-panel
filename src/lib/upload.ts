import { toast } from "sonner";

export async function imageToUrl(image: File): Promise<string> {
  const key = import.meta.env.VITE_PUBLIC_IMGBB_KEY;
  if (!key) {
    throw new Error("ImgBB API key is not configured (VITE_PUBLIC_IMGBB_KEY)");
  }

  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Image upload failed (${response.status})`);
  }

  const result = (await response.json()) as {
    data?: { image?: { url?: string } };
    error?: { message?: string };
  };

  const url = result.data?.image?.url;
  if (!url) {
    throw new Error(result.error?.message ?? "Image upload failed");
  }

  return url;
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
    toast.success("Cover image uploaded");
  }

  const galleryUrls: string[] = [];
  const gallery = data.galleryImages;

  if (Array.isArray(gallery)) {
    for (const item of gallery) {
      if (typeof item === "string" && item) {
        galleryUrls.push(item);
      } else if (item instanceof FileList && item.length > 0) {
        for (let i = 0; i < item.length; i++) {
          const url = await imageToUrl(item[i]!);
          galleryUrls.push(url);
        }
      }
    }
  } else if (gallery instanceof FileList && gallery.length > 0) {
    for (let i = 0; i < gallery.length; i++) {
      const url = await imageToUrl(gallery[i]!);
      galleryUrls.push(url);
    }
  }

  if (galleryUrls.length > 0 && gallery instanceof FileList) {
    toast.success("Gallery images uploaded");
  }

  return { coverImage: coverUrl, galleryImages: galleryUrls };
}

export async function resolveCoverImage(coverImage?: string | FileList): Promise<string | undefined> {
  const { coverImage: coverUrl } = await resolveProjectFormImages({ coverImage });
  return coverUrl;
}

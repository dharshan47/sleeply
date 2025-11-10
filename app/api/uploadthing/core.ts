import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({
    image: { maxFileSize: "4MB" },
  })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File uploaded:", file.url);
      return { url: file.ufsUrl }; // Return URL to client
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

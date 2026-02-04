import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getSession } from "@/lib/auth-server";

const f = createUploadthing();

export const ourFileRouter = {
  // 🔥 KEEP SAME NAME AS OLD CODE
  profileImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getSession();

      if (!session?.user?.id) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl, // ✅ SAME AS OLD CODE
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

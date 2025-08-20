"use client";

import PropertyDataForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { storage } from "@/firebase/client";
import { propertySchema } from "@/validation/propertySchema";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { savePropertyImages } from "../actions";
import { createProperty } from "./actions";

const NewPropertyForm = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();
    if (!token) return;

    const { images, ...rest } = data;

    // create property
    const response = await createProperty(rest, token);
    if (!!response.error || !response.propertyId) {
      toast.error("Error!", { description: response.error });
      return;
    }

    // upload images
    const uploadTasks: UploadTask[] = [];
    const paths: string[] = [];

    images.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${response.propertyId}/${Date.now()}-${index}-${image.file.name}`;
        paths.push(path);

        const storageRef = ref(storage, path);
        uploadTasks.push(uploadBytesResumable(storageRef, image.file));
      }
    });

    await Promise.all(uploadTasks);
    await savePropertyImages({ propertyId: response.propertyId, images: paths }, token);

    toast.success("Success!", { description: "Property created" });

    router.push("/admin");
  };

  return (
    <div>
      <PropertyDataForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircleIcon /> Create Property
          </>
        }
      />
    </div>
  );
};

export default NewPropertyForm;

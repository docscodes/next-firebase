"use client";

import PropertyDataForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertyDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { createProperty } from "./actions";

const NewPropertyForm = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();
    if (!token) return;

    const response = await createProperty(data, token);
    if (!!response.error) {
      toast.error("Error!", { description: response.error });
      return;
    }

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

"use client";

import PropertyDataForm from "@/components/property-form";
import { propertyDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import z from "zod";

const NewPropertyForm = () => {
  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    console.log(data);
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

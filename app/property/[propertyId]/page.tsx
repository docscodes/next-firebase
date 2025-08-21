import { getPropertyById } from "@/data/properties";
import ReactMarkdown from "react-markdown";
import BackButton from "./back-button";

const Property = async ({ params }: { params: Promise<any> }) => {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);

  return (
    // Right column to be 500px, left to be the remaining
    <div className="grid grid-cols-[1fr_400px]">
      <div>
        Carousel
        <div className="property-description max-w-screen-md mx-auto py-10 px-4">
          <BackButton />
          <ReactMarkdown>{property.description}</ReactMarkdown>
        </div>
      </div>

      <div className="bg-sky-200 h-screen sticky"></div>
    </div>
  );
};

export default Property;

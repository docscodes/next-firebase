import { getUserFavourites } from "@/data/favourites";
import { getPropertiesByIds } from "@/data/properties";

export default async function Favourites({ searchParams }: { searchParams: Promise<any> }) {
  // page
  const searchParamsValues = await searchParams;
  const page = searchParamsValues?.page ? parseInt(searchParamsValues.page) : 1;

  // favourites
  const favourites = await getUserFavourites();
  const allFavourites = Object.keys(favourites);

  // pagination
  const pageSize = 2;
  const totalPages = Math.ceil(allFavourites.length / pageSize);
  const paginatedFavourites = allFavourites.slice((page - 1) * pageSize, page * pageSize);

  const properties = await getPropertiesByIds(paginatedFavourites);
  console.log({ paginatedFavourites, properties });

  return <div>favourites</div>;
}

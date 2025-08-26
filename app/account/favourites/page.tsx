import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserFavourites } from "@/data/favourites";
import { getPropertiesByIds } from "@/data/properties";
import { EyeIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold py-4 mt-5">My favourites</h1>

      {!paginatedFavourites.length && (
        <h2 className="text-center text-zinc-400 text-3xl font-bold py-10">
          You have no favourited properties.
        </h2>
      )}

      {!!paginatedFavourites.length && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedFavourites.map((favourite) => {
              const property = properties.find((property) => property.id === favourite);

              const address = [
                property?.address1,
                property?.address2,
                property?.city,
                property?.postcode,
              ]
                .filter((addressLine) => !!addressLine)
                .join(", ");

              return (
                <TableRow key={favourite}>
                  <TableCell>{address}</TableCell>

                  <TableCell>
                    {!!property && <PropertyStatusBadge status={property?.status} />}
                  </TableCell>

                  <TableCell className="flex justify-end gap-1">
                    {!!property && (
                      <>
                        <Button
                          asChild
                          variant="outline"
                        >
                          <Link href={`/property/${property.id}`}>
                            <EyeIcon />
                          </Link>
                        </Button>
                        <Button variant="outline">
                          <Trash2Icon />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter />
        </Table>
      )}
    </div>
  );
}

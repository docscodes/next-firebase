import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProperty() {
  return (
    <div>
      <Breadcrumbs
        items={[
          {
            href: "/admin",
            label: "Dashboard",
          },
          {
            label: "New Property",
          },
        ]}
      />

      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">New Property</CardTitle>
        </CardHeader>
        <CardContent>New Property</CardContent>
      </Card>
    </div>
  );
}

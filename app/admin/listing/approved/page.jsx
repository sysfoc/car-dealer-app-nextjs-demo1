import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Manage Listings</h2>
      <div className="mt-5">
        <Table>
          <TableHead>
            <TableHeadCell>Featured Photo</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Brand</TableHeadCell>
            <TableHeadCell>Location</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <Image
                  src={"/Luxury SUV.webp"}
                  width={80}
                  height={80}
                  alt="Image Of Car"
                  style={{ objectPosition: "center" }}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>Toyota Corolla</TableCell>
              <TableCell>Toyota</TableCell>
              <TableCell>Pakistan</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Button color={"warning"} size={"sm"}>
                    Unapprove
                  </Button>
                  <Button color={"success"} size={"sm"}>
                    approve
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <Image
                  src={"/Luxury SUV.webp"}
                  width={80}
                  height={80}
                  alt="Image Of Car"
                  style={{ objectPosition: "center" }}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>Toyota Corolla</TableCell>
              <TableCell>Toyota</TableCell>
              <TableCell>Pakistan</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Button color={"warning"} size={"sm"}>
                    Unapprove
                  </Button>
                  <Button color={"success"} size={"sm"}>
                    approve
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <Image
                  src={"/Luxury SUV.webp"}
                  width={80}
                  height={80}
                  alt="Image Of Car"
                  style={{ objectPosition: "center" }}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>Toyota Corolla</TableCell>
              <TableCell>Toyota</TableCell>
              <TableCell>Pakistan</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-3">
                  <Button color={"warning"} size={"sm"}>
                    Unapprove
                  </Button>
                  <Button color={"success"} size={"sm"}>
                    approve
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

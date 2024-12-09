import React from "react";
import { Table, TableBody, TableCell, TableRow } from "flowbite-react";
import { RxHamburgerMenu } from "react-icons/rx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Tables = ({ loadingState }) => {
  const loading = loadingState;
  return (
    <div>
      <div className="flex items-center gap-2 bg-blue-950 p-3 dark:bg-gray-700">
        <div>
          <RxHamburgerMenu fontSize={25} className="text-white" />
        </div>
        <h3 className="text-lg font-bold uppercase text-white">
          Vehical Details
        </h3>
      </div>
      <Table hoverable className="mt-3 dark:bg-gray-700">
        {loading ? (
          <TableBody className="divide-y">
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                <Skeleton height={25} />
              </TableCell>
              <TableCell>
                <Skeleton height={25} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                <Skeleton height={25} />
              </TableCell>
              <TableCell>
                <Skeleton height={25} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                <Skeleton height={25} />
              </TableCell>
              <TableCell>
                <Skeleton height={25} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                <Skeleton height={25} />
              </TableCell>
              <TableCell>
                <Skeleton height={25} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                <Skeleton height={25} />
              </TableCell>
              <TableCell>
                <Skeleton height={25} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                <Skeleton height={25} />
              </TableCell>
              <TableCell>
                <Skeleton height={25} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                <Skeleton height={25} />
              </TableCell>
              <TableCell>
                <Skeleton height={25} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                <Skeleton height={25} />
              </TableCell>
              <TableCell>
                <Skeleton height={25} />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody className="divide-y">
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Vehical
              </TableCell>
              <TableCell>2010 Ford Falcon FG XR8 Ute Super Cab 6</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Doors
              </TableCell>
              <TableCell>2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Seats
              </TableCell>
              <TableCell>3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Cylinders
              </TableCell>
              <TableCell>8</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Fuel Type
              </TableCell>
              <TableCell>Petrol - Unleaded</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Gearbox
              </TableCell>
              <TableCell>Sports Automatic</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Gears
              </TableCell>
              <TableCell>6 Speed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-blue-950 dark:text-gray-200">
                Capacity
              </TableCell>
              <TableCell>5-4</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default Tables;

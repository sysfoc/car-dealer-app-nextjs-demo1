export const metadata = {
  title: "Dashboard - Auto Car Dealers",
  description: "Manage your car deals and settings from the admin dashboard.",
};

export default function Dashboard() {
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-lg border-l-4 border-blue-700 bg-white px-8 py-14 dark:border-red-500 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-red-500">
            Active Customers
          </h2>
          <p className="mt-2 text-3xl font-bold">100</p>
        </div>
        <div className="rounded-lg border-l-4 border-blue-700 bg-white px-8 py-14 dark:border-red-500 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-red-500">
            Pending Customers
          </h2>
          <p className="mt-2 text-3xl font-bold">100</p>
        </div>
        <div className="rounded-lg border-l-4 border-blue-700 bg-white px-8 py-14 dark:border-red-500 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-red-500">
            Active Listings
          </h2>
          <p className="mt-2 text-3xl font-bold">100</p>
        </div>
        <div className="rounded-lg border-l-4 border-blue-700 bg-white px-8 py-14 dark:border-red-500 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-red-500">
            Pending Listings
          </h2>
          <p className="mt-2 text-3xl font-bold">100</p>
        </div>
      </div>
    </div>
  );
}

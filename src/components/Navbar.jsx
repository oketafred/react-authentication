import Dropdown from "./Dropdown.jsx";

export default function Navbar() {
    return (
			<div className="sticky top-0 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 lg:py-2.5">
				<div className="flex items-center justify-between space-x-4 px-6 2xl:container">
					<div className="flex space-x-4">
					<h5 className="text-2xl font-medium text-gray-600 lg:block dark:text-white">Dashboard</h5>
					</div>
					<div className="flex space-x-4">
						<Dropdown />
					</div>
				</div>
			</div>
    );
}
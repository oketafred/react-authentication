import {NavLink, useLocation} from "react-router-dom";
import { RxDashboard } from "react-icons/rx"
import { FiUsers } from "react-icons/fi";

export default function Sidebar() {
	const { pathname } = useLocation();

	const location = pathname.substring(1);

    return (
			<aside
				className="fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-cyan-700 px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
			>
				<div>
					<div className="-mx-6 px-6 py-4">
						<a className="cursor-pointer">
							<h3 className="text-2xl text-gray-50 font-medium">React - Laravel</h3>
						</a>
					</div>

					<ul className="mt-6 space-y-2 tracking-wide">
						<li>
							<NavLink
								to="/dashboard"
								className={ "relative flex items-center space-x-4 px-4 py-3 text-gray-50 " + (location === 'dashboard' ? 'rounded-lg text-gray-50 bg-cyan-800' : '') }
							>
								<RxDashboard className="-ml-1 h-4 w-4 font-medium" />
								<span className="-mr-1">Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/users"
								className={ "relative flex items-center space-x-4 px-4 py-3 text-gray-50 " + (location === 'users' ? 'rounded-lg text-gray-50 bg-cyan-800' : '') }
							>
								<FiUsers className="-ml-1 h-4 w-4 font-medium" />
								<span className="-mr-1">Users</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</aside>
    );
}
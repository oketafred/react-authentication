import {useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function Dropdown() {
		const [showOptions, setShowOptions] = useState(false);

		const { user, setUser, setToken } = useStateContext();

		const showDropdown = () => {
			setShowOptions((prevState) => !prevState);
		}

	const onLogout = (event) => {
		event.preventDefault();

		axiosClient.post('logout')
			.then(() => {
				setUser({});
				setToken(null);
			})

	}

    return (
			<div className="relative inline-block text-left">
				<div>
					<button
						type="button"
						onClick={showDropdown}
						className="inline-flex w-full justify-center bg-white px-4 py-2 text-sm font-medium text-gray-700"
					>
						<img className="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-0 sm:mr-2 border-2 border-cyan-500"
								 src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								 alt="" />

						<span className="mt-1 hidden sm:block">{ user.name }</span>

						{showOptions ?
							<HiChevronUp className="-mr-1 ml-2 mt-1 h-5 w-5" /> :
							<HiChevronDown className="-mr-1 ml-2 mt-1 h-5 w-5" />
						}

					</button>
				</div>

				{showOptions && (
					<div
						className="absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
						<div className="py-1" role="none">
							<a className="text-gray-700 cursor-pointer block px-4 py-2 text-sm" role="menuitem" tabIndex="-1"
								 id="menu-item-0">Profile</a>
						</div>
						<div className="py-1" role="none">
							<a onClick={onLogout} className="text-gray-700 cursor-pointer block px-4 py-2 text-sm" role="menuitem" tabIndex="-1"
								 id="menu-item-6">Logout</a>
						</div>
					</div>
				)}
			</div>
    );
}
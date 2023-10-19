"use client";

import LoadingSpinner from "@/components/Spinner";
import { usersListTypes } from "@/types/usersListTypes";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";

export default function Dashboard() {
  const router = useRouter();
  const [usersList, setUsersList] = React.useState<usersListTypes[]>();
  const [userName, setUserName] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    axios
      .get("https://www.mockachino.com/06c67c77-18c4-45/users")
      .then((response) => {
        setUsersList(response.data.users);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("https://www.mockachino.com/06c67c77-18c4-45/login")
      .then((response) => {
        const name = `${response.data.name} ${response.data.lastname}`
        setUserName(name)
        setIsLoading(false)
      });
  }, []);

  const logOut = () => {
    deleteCookie("token");
    router.push("/");
  };

  return (
    <div>
        <div className="w-full flex justify-between items-center p-4">
            {isLoading ? <LoadingSpinner /> : <h1>Hi, {userName}</h1> }
            <button onClick={logOut} className="px-4 py-2 mt-2 tracking-wide text-white transition-colors duration-200 transform bg-[#D81B60] rounded-md hover:bg-[#bb0a4b] focus:outline-none focus:bg-[#bb0a4b]">Logout</button>
        </div>


      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl my-12">Users list</h1>
        <table className="w-5/6 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Profession
              </th>
              <th scope="col" className="px-6 py-3">
                Birthday
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
            </tr>
          </thead>
          <tbody>
            {usersList?.map((user) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover-bg-gray-600"
                key={user.contactId}
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.photo ? user.photo : "/profile.svg"}
                    alt="Profile image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {user.name} {user.surnames}
                    </div>
                    <div className="font-normal text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.profesion}</td>
                <td className="px-6 py-4">{user.birthDate}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 capitalize">{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

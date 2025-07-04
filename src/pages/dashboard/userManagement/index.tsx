import { useCallback, useState } from "react";
import UsersTable from "../components/UsersTable";
import { useGetAllUsersQuery } from "../../../store/apiSlice";
import Pagination from "../components/pagination";
import Loader from "../../../ui/Loader";
import { debounce } from 'lodash';

const Users = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    status: 'active',
    search: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTimeFilter, setActiveTimeFilter] = useState<"week" | "year">(
    "week"
  );

  const { data, isLoading } = useGetAllUsersQuery(params);

  const onPageChange = (page: number) => {
    setParams(prev => ({
      ...prev,
      page
    }))
  }

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setParams(prev => ({
        ...prev,
        page: 1,
        search: value.trim(),
      }));
    }, 2000),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <>
      <div className="page-header">
        <h1>All Users</h1>
        <p className="subtitle">Here is an overview of your dashboard</p>
      </div>

      <div className="users-section">
        <div className="section-header">
          <h2>Users</h2>
          <div className="actions">
            <input
              className="search-input"
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="filter-action">
              <span>Filter</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2H2L6.8 7.6V12.4L9.2 13.6V7.6L14 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <div className="time-filter">
              <button
                className={`filter-btn ${activeTimeFilter === "week" ? "active" : ""
                  }`}
                onClick={() => setActiveTimeFilter("week")}
              >
                Week
              </button>
              <button
                className={`filter-btn ${activeTimeFilter === "year" ? "active" : ""
                  }`}
                onClick={() => setActiveTimeFilter("year")}
              >
                Year
              </button>
            </div>
          </div>
        </div>

        {isLoading && <Loader />}
        {(!isLoading && data.length) && <UsersTable users={data} />}

        {data?.length && <Pagination
          totalPages={100}
          currentPage={params.page}
          onPageChange={onPageChange}
        />}
      </div>
    </>
  );
}

export default Users;

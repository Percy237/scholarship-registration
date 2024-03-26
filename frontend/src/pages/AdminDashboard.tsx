import { useQuery } from "react-query";
import Datatable from "../datatable/Datatable";
import * as apiClient from "../api-client";
import { useEffect } from "react";

const AdminDashboard = () => {

  const {data} = useQuery("totalStudents", apiClient.getTotalNumberOfStudents);
  
    useEffect(() => {
    console.log("Fetched Data:", data); // Logging the fetched data
  }, [data]);


  return (
    <div>
      <div>
        <p>Total Students: {data?.total}</p>
      </div>
      <Datatable/>
    </div>
  )
}

export default AdminDashboard
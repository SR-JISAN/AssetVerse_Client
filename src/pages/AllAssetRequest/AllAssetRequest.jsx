import React from 'react';


const AllAssetRequest = () => {
    

    return (
      <div>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          
          
                <tr
                  
                  className="text-center border border-gray-200"
                >
                  <td>employeeId</td>
                  <td>asset?.name || "Loading..."</td>
                  <td>req.date</td>
                  <td>req.status</td>
                  <td>
                    req.status === "Pending" && (
                      <>
                        <button
                          onClick={() => ''}
                          className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => ''}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )
                    req.status !== "Pending" && <span>Done</span>
                  </td>
                </tr>
            
           
          </tbody>
        </table>
      </div>
    );
};

export default AllAssetRequest;
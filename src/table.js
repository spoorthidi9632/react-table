import React from "react";

const Table = ({data}) =>{
    return(
        <div className="table">
             
        <table>
            <tbody>
                <tr className="sub">
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Status</th>
                    <th>Email</th>
                    <th>Year of Birth</th>
                </tr>
                {data.map(item=>(
                    <tr key={item.id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                     <td>{item.status}</td>
                    <td>{item.email}</td>
                    <td>{item.yearOfBirth}</td>
                </tr>
                ))}
                
            </tbody>
        </table>


        </div>
       
    )
}
export default Table;
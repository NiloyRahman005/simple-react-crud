import { useState, useEffect } from "react";
import http from "../http";  // Ensure this is your axios instance
import Swal from 'sweetalert2';

export default function Home() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState({ id: "", name: "", email: "" });

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = () => {
        http.get('/users')
            .then(res => {
                // console.log(res.data);  // Log the response to ensure it's an array
                setUsers(res.data.users);  // Make sure you're setting the correct part of the response
            })
            .catch(error => {
                console.error(error);  // Handle error
            });
    };
    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                http.delete(`/users/${id}`)
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            res.data.message,
                            'success'
                        );
                        // Remove the user from the list after deletion
                        setUsers(users.filter((user) => user.id !== id));
                    })
                    .catch((err) => {
                        Swal.fire(
                            'Failed!',
                            'Failed to delete the user!',
                            'error'
                        );
                        console.error(err);
                    });
            }
        });
    };
    const handleEditClick = (user) => {
        setEditUser(user);
        console.log(user);
    };
    const handleEditSubmit = () => {
        // Make sure editUser contains the required fields (id, name, email)
        if (!editUser.name || !editUser.email) {
            Swal.fire("Validation Error!", "Name and Email are required.", "error");
            return;
        }
    
        // Log the data to ensure the correct data is being sent
        console.log('Updating User:', editUser);
    
        // Send the PUT request
        http.put(`/users/${editUser.id}`, editUser)
            .then((res) => {
                console.log(res.data.message);
    
                // Update the user in the local state immediately
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === editUser.id ? { ...user, ...editUser } : user
                    )
                );
    
                // Optionally, show a success notification
                Swal.fire("Updated!", res.data.message, "success");
    
                // Close the modal
                document.getElementById("closeModal").click();
            })
            .catch((err) => {
                Swal.fire("Failed!", err.response?.data?.message || "Failed to update the user!", "error");
            });
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mx-auto text-light p-5">
                    <div class="card">
                        <div class="card-header">
                        <h3 className="text-center">Users Lists</h3>
                        </div>
                        <div class="card-body">
                        <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className = "btn btn-danger" onClick={()=>deleteUser(user.id)}>Delete</button>
                                        <button
                                                className="btn btn-success m-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editUserModal"
                                                onClick={() => handleEditClick(user)}
                                            >
                                                Edit
                                            </button>
                                    </td>
                                </tr>
                            )
                            
                            
                            )}
                        </tbody>
                    </table>
                        </div>
               



<div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="mb-3">
                                <label htmlFor="userName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    value={editUser.name}
                                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="userEmail"
                                    value={editUser.email}
                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                />
                            </div>
      </div>
      <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="closeModal" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>Save Changes</button>
                        </div>
    </div>
  </div>
</div>

                  
                </div>
                </div>
            </div>
            
           </div>
      
        
    );
}


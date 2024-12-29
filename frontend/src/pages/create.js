import { useState } from "react";
import http from "../http"; // Ensure this is your axios instance
import Swal from 'sweetalert2';

export default function Create() {
    
    const [posts, setPostuser] = useState({ name: "", email: "" , password : ""});

    const handlePostSubmit = () => 
        {
        // Send a POST request to create a user
        http.post(`/users/`, posts)
            .then((res) => {
                 console.log(res.data.msg);

                // Display success message
                if (res.data.msg === 'success') {
                    Swal.fire('Success', 'User created successfully!', 'success');
                } else {
                    Swal.fire('Failed', 'Failed to create user', 'error');
                }
            })
            .catch((err) => {
                // Handle error cases
                Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
                console.error(err);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mx-auto text-light p-5">
                    <div className="card">
                        <div className="card-header">
                            <h3>Create</h3>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    value={posts.name}  // Bind the input value to the state
                                    onChange={(e) => setPostuser({ ...posts, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="userEmail"
                                    value={posts.email}  // Bind the input value to the state
                                    onChange={(e) => setPostuser({ ...posts, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userEmail" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="userpass"
                                    value={posts.password}  // Bind the input value to the state
                                    onChange={(e) => setPostuser({ ...posts, password: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={handlePostSubmit}  // Call the function on button click
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

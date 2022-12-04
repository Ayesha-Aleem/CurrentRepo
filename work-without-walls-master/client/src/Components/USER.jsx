import React from 'react'
const User=({post})=>{
return(
    <div className="col-md-6" >
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">Name</div>
                <div className="col-md-6"><p className='inppppp' type="text" >{post.firstname}{" "}
                  {post.lastname}</p></div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">Email</div>
                <div className="col-md-6"><p className='inppppp' type="text" >{post.email}</p></div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">Phone</div>
                <div className="col-md-6"><p className='inppppp' type="text">{post.phone}</p> </div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">CINIC Number</div>
                <div className="col-md-6"><p className='inppppp' type="text">{post["CNIC"]}</p></div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">CINIC Front</div>
                <div className="col-md-6"><p className='inpppppu' type="text"> <a href={post["cnicFront"]}>{post["cnicFront"]}</a></p> </div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">CINIC Back</div>
                <div className="col-md-6"><p className='inpppppu' type="text"> <a href={post["cnicBack"]}>{post["cnicFront"]}</a></p></div>
              </div>
              
            </div>
)
}
export default User;
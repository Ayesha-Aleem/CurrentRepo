import React from "react";
import "../../Css Files/Bid.css";
import Popup from "reactjs-popup";
import { useState } from "react";

const Bid = () => {
  const [request, setRequest] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit voluptate quas labore ab, iusto ipsam sunt quasi recusandae ea fugiat numquam vitae dolorum, repellendus, blanditiis corrupti necessitatibus. Veritatis, perferendis magnam!"
  );

  const [offer, setOffer] = useState("");

  const [buget, setBuget] = useState(null);
  const [delTime, setDelTime] = useState(null);
  const [perOff, setPerOff] = useState(null);

  return (
    <>
      <span>
        <Popup
          trigger={
            <button type="button" class="btn btn-primary">
              Bid
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="">
              <button className="btn-md close" onClick={close}>
                &times;
              </button>

              <div className="container ml">
                <div >
                  <div className="request-area area">
                    <p>{request}</p>
                  </div>
                  <div className="offer">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Describe your offer"
                      onChange={(e) => {
                        setOffer(e.target.value);
                      }}
                      value={offer}
                    ></textarea>
                  </div>
                  <div className="buget">
                    <h5>Buget</h5>
                    <input
                      type="number"
                      name=""
                      id=""
                      placeholder="$"
                      onChange={(e) => {
                        setBuget(e.target.value);
                      }}
                      value={buget}
                    />
                  </div>
                  <div className="buget">
                    <h5>Delivery Time</h5>
                    <input
                      type="number"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDelTime(e.target.value);
                      }}
                      value={delTime}
                    />
                  </div>
                  <div className="buget">
                    <h5>Percntage Off</h5>
                    <input
                      type="number"
                      name=""
                      id=""
                      onChange={(e) => {
                        setPerOff(e.target.value);
                      }}
                      value={perOff}
                    />
                  </div>

                  <div className="submit">
                    <button type="button" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </span>
    </>
  );
};

export default Bid;

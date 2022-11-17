import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import axios from "axios";

export default function Scorecard(Props) {
  const [matchID, setMatchID] = useState("");
  const [match, setMatch] = useState({
    homeTeam: "",
    awayTeam: "",
    playingDate: "",
    matchID: "",
  });
  const findMatch = async () => {
    await axios
      .get(`${process.env.REACT_APP_DOMAIN}/find-match`, {
        headers: {
          ID: matchID,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setMatch(res.data.data);
      });
  };
  return (
    <>
      <Breadcrumb
        t={Props.t}
        headerLine="Please Fill All The Information Carefully to Add New ScoreCard Details"
      />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Add New Player Bio</h3>
                </div>
                <div class="card-body form-row">
                  <div class="form-group col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      id="matchid"
                      placeholder="Match ID"
                      value={matchID}
                      onChange={(e) => {
                        setMatchID(e.target.value);
                      }}
                    />
                    <br />
                    <button
                      onClick={findMatch}
                      className="btn btn-success btn-block col-md-4"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Match Details</h3>
                </div>
                <div class="card-body form-row">
                  <div class="form-group col-md-12">
                    <div class="row">
                      <div class="col-md-4">
                        <label>Match ID: </label> {match.matchID}
                        <br />
                        <label>Date: </label> {match.playingDate}
                        <br />
                        <label>Status: </label> Completed
                      </div>
                      <div class="col-md-4">
                        <label>Team Home: </label> {match.homeTeam}
                        <br />
                        <button className="btn btn-warning btn-sm">
                          Add Score
                        </button>
                      </div>
                      <div class="col-md-4">
                        <label>Team Away: </label> {match.awayTeam}
                        <br />
                        <button className="btn btn-info btn-sm">
                          Add Score
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Scorecard</h3>
                </div>
                <div class="card-body form-row">
                  <div class="form-group col-md-12">
                    <form class="form-inline">
                      <div class="card card-primary card-outline col-md-3">
                        <div class="card-body box-profile">
                          <div class="text-center">
                            <img
                              class="profile-user-img img-fluid img-circle"
                              src="../../dist/img/user4-128x128.jpg"
                              alt="User profile picture"
                            />
                          </div>

                          <h3 class="profile-username text-center">
                            Ali Rathore
                          </h3>

                          <p class="text-muted text-center">All Rounder</p>

                          <ul class="list-group list-group-unbordered mb-3">
                            <li class="list-group-item">
                              <p class="text-muted text-left">Batting Data:</p>
                              <div class="col-md-4">
                                <label>Runs</label>
                                <input
                                  type="number"
                                  min="0"
                                  value="0"
                                  class="form-control col-md-12"
                                  id="runs"
                                  placeholder="Runs"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                />
                              </div>
                              <div class="col-md-4">
                                <label>Balls</label>
                                <input
                                  type="number"
                                  min="0"
                                  value="0"
                                  class="form-control col-md-12"
                                  id="ballsfaced"
                                  placeholder="Balls"
                                />
                              </div>
                            </li>
                            <li class="list-group-item">
                              <div>
                                <p class="text-muted text-left">
                                  Bowling Data:
                                </p>
                                <input
                                  type="number"
                                  min="0"
                                  value="0"
                                  class="form-control col-sm-4"
                                  id="overs"
                                  placeholder="Ov"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  value="0"
                                  class="form-control col-sm-4"
                                  id="runsconceeded"
                                  placeholder="Rs"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  value="0"
                                  class="form-control col-sm-4"
                                  id="wickets"
                                  placeholder="Wkt"
                                />
                              </div>
                            </li>
                            <li class="list-group-item">
                              <div>
                                <p class="text-muted text-left">
                                  Fielding Data:
                                </p>
                                <input
                                  type="number"
                                  min="0"
                                  value="0"
                                  class="form-control col-sm-4"
                                  id="catches"
                                  placeholder="Ct"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  value="0"
                                  class="form-control col-sm-4"
                                  id="stumping"
                                  placeholder="St"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  value="0"
                                  class="form-control col-sm-4"
                                  id="runout"
                                  placeholder="Ro"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div class="ribbon-wrapper ribbon-lg">
                          <div class="ribbon bg-danger text-lg">Captain</div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

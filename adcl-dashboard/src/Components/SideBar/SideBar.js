import React from 'react'
import LOGO from '../../Assets/Images/ADCL-LOGO.png'
import { Link } from 'react-router-dom'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import GroupIcon from '@material-ui/icons/Group';
import ExtensionIcon from '@material-ui/icons/Extension';
import ScoreIcon from '@material-ui/icons/Score';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import GamesIcon from '@material-ui/icons/Games';
const SideBar = () => {
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={LOGO} className="img-circle" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">ADCL ADMIN</a>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li className="nav-item menu-open">
                                <Link to="/dashboard" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>

                            </li>


                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon far">
                                        <DirectionsRunIcon />
                                    </i>
                                    <p>
                                        Players
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="players" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Search Players</p>
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/dashboard/add-new-player" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add New Player</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon far">
                                        <ExtensionIcon />
                                    </i>
                                    <p>
                                        Tournments
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="tournaments" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Search Tournments</p>
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="add-new-tournment" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Tournment</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon far">
                                        <GroupWorkIcon />
                                    </i>
                                    <p>
                                        Teams
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Search Teams</p>
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="add-new-team" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Teams</p>
                                        </Link>
                                    </li>
                                </ul>

                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon far">
                                        <GamesIcon />
                                    </i>
                                    <p>
                                        Fixtures
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Search Fixture</p>
                                        </Link>
                                    </li>
                                </ul>
                                {/* <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Fixtures</p>
                                        </Link>
                                    </li>
                                </ul> */}
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Fixture</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon far" ><ScoreIcon /></i>
                                    <p>
                                        Scorecard
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="add-team-players" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Team Players</p>
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/dashboard/scorecard" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Scorecard</p>
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Fixtures</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon far">
                                        <GroupIcon />
                                    </i>
                                    <p>
                                        Bidding System
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/dashboard/seasons" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Seasons</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/dashboard/allot-players-to-teams" className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Allot Players</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <i className="nav-icon far"><ExitToAppIcon /></i>
                                    <p>
                                        Logout
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>

        </div>
    )
}

export default SideBar
import React from "react";

import "./Dashboard.css";
import NavBar from "../NavBar";
import StatusBar from "../StatusBar";
import RightSidebar from "../UI/RightSidebar";
import ChatBox from "../Dashboard/ChatBox";
import MainAreaMedium from "../UI/MainAreaMedium";
import WeatherDashCard from "../Components/WeatherDashCard";
import StockExchangeCard from "../Components/StockExchangeCard";
import TasksDashCard from "../Components/TasksDashCard";
import ProjectsCard from "../Components/ProjectsCard";

function Dashboard(props) {
  return (
    <React.Fragment>
      <NavBar user={props.user}>
        <h2>Dashboard</h2>
      </NavBar>
      <MainAreaMedium>
        <WeatherDashCard />

        <StockExchangeCard user={props.user} />
        <TasksDashCard user={props.user} />
        <ProjectsCard />
      </MainAreaMedium>

      <RightSidebar>
        <ChatBox user={props.user}/>
      </RightSidebar>
      <StatusBar />
    </React.Fragment>
  );
}

export default Dashboard;

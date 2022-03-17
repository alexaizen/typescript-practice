import React from "react";
import TitleBar from "../Components/TitleBar";
import Dashcard from "../UI/DashCard";
import PageContentWrapper from "../UI/PageContentWrapper";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <PageContentWrapper>
      <TitleBar title={"Dashboard"}></TitleBar>
      <main className="dash-wrapper">
        <Dashcard>
          <p>test</p>
        </Dashcard>
        <Dashcard>
          <p>test</p>
        </Dashcard>
        <Dashcard>
          <p>test</p>
        </Dashcard>
        <Dashcard>
          <p>test</p>
        </Dashcard>
      </main>
      <div className="chat-box">
        <p>dasdas</p>
        <p>dasdasdasdcdsdvcsf</p>
      </div>
    </PageContentWrapper>
  );
};

export default Dashboard;

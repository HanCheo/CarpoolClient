import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../Components/Button";
import { getRide, userProfile } from "../../types/api";

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${props => props.theme.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  max-width: 50px;
  height: 50px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

interface IProps {
  data?: getRide;
  userData?: userProfile;
  loading: boolean;
  updateRideFn: MutationFn;
}

const RidePresenter: React.SFC<IProps> = ({ data, userData, updateRideFn }) => {
  const { GetRide: { ride = null } = {} } = data || {};
  const { GetMyProfile: { user = null } = {} } = userData || {};
  return (
    <Container>
      <Helmet>
        <title>Ride | With Go</title>
      </Helmet>
      {ride && user && (
        <React.Fragment>
          <Title>이용자</Title>
          <Passenger>
            <Img src={ride.passenger.profilePhoto!} />
            <Data>{ride.passenger.fullName!}</Data>
          </Passenger>
          {ride.driver && (
            <React.Fragment>
              <Title>운전자</Title>
              <Passenger>
                <Img src={ride.driver.profilePhoto!} />
                <Data>{ride.driver.fullName!}</Data>
              </Passenger>
            </React.Fragment>
          )}
          <Title>출발지</Title>
          <Data>{ride.pickUpAddress}</Data>
          <Title>목적지</Title>
          <Data>{ride.dropOffAddress}</Data>
          <Title>가격</Title>
          <Data>{ride.price}</Data>
          <Title>거리</Title>
          <Data>{ride.distance}</Data>
          <Title>{ride.status === "ONROUTE" && "소요시간"}</Title>
          <Data>{ride.status === "ONROUTE" && ride.duration}</Data>
          <Title>{ride.status === "ACCEPTED" && "탑승예정시간"}</Title>
          <Data>{ride.status === "ACCEPTED" && ride.departDuration}</Data>
          <Title>상태</Title>
          <Data>{ride.status}</Data>
          <Buttons>
            {ride.driver &&
              ride.driver.id === user.id &&
              ride.status === "ACCEPTED" && (
                <ExtendedButton
                  value={"탑승"}
                  onClick={() =>
                    updateRideFn({
                      variables: {
                        rideId: ride.id,
                        status: "ONROUTE"
                      }
                    })
                  }
                />
              )}
            {ride.driver &&
              ride.driver.id === user.id &&
              ride.status === "ONROUTE" && (
                <ExtendedButton
                  value={"도착"}
                  onClick={() =>
                    updateRideFn({
                      variables: {
                        rideId: ride.id,
                        status: "FINISHED"
                      }
                    })
                  }
                />
              )}
            {ride.status !== "REQUESTING" &&
              ride.status !== "ONROUTE" &&
              ride.status !== "FINISHED" && (
                <Link to={`/chat/${ride.chatId}`}>
                  <ExtendedButton value={"채팅"} onClick={null} />
                </Link>
              )}
          </Buttons>
        </React.Fragment>
      )}
    </Container>
  );
};

export default RidePresenter;

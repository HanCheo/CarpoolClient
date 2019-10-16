import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import Menu from "../../Components/Menu";
import styled from "../../typed-components";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
}
const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: white;
  border-radius: 40px;
  overflow: hidden;
`;
const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Home | With Go</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          backgroundColor: "white",
          width: "60%",
          zIndex: "10"
        }
      }}
    >
      {loading && <Image src={"https://cdn.dribbble.com/users/2105224/screenshots/6594820/loding.gif"} />}
      {!loading && <button onClick={toggleMenu}>사이드바 열기</button>}
    </Sidebar>
  </Container>
);

export default HomePresenter;

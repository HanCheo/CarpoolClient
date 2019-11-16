import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import BackArrow from "../../Components/BackArrow";
import { GOOGLE_KEY } from "../../keys";
import styled from "../../typed-components";

const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
`;

const Title = styled.h2`
  font-size: 25px;
  margin-bottom: 40px;
`;

const SizeBox = styled.h3`
  margin-top: 10px;
`;

const Links = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
`;

const Icon = styled.span`
  margin-right: 10px;
  margin-top: 5px;
`;

const BackArrowExtended = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

interface IProps {
  ggloginCallback: (response) => void;
  fbloginCallback: (response) => void;
}

const SocialLoginPresenter: React.SFC<IProps> = ({ ggloginCallback, fbloginCallback }) => (
  <Container>
    <Helmet>
      <title>Social Login | With Go</title>
    </Helmet>
    <Title>로그인 방법을 선택하세요</Title>
    <BackArrowExtended backTo={"/"} />
    <FacebookLogin
      appId="542449509659883"
      autoLoad={false}
      fields="name, first_name,last_name,email, id"
      callback={fbloginCallback}
      render={renderProps => (
        <Links onClick={renderProps.onClick}>
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#344EA1"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </Icon>
          Facebook
        </Links>
      )}
    />
    <SizeBox />
    <GoogleLogin
      clientId={GOOGLE_KEY}
      buttonText="Login"
      onSuccess={ggloginCallback}
      onFailure={ggloginCallback}
      cookiePolicy={"single_host_origin"}
      render={renderProps => (
        <Links onClick={renderProps.onClick}>
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#f0b402"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-10.333 16.667c-2.581 0-4.667-2.087-4.667-4.667s2.086-4.667 4.667-4.667c1.26 0 2.313.46 3.127 1.22l-1.267 1.22c-.347-.333-.954-.72-1.86-.72-1.593 0-2.893 1.32-2.893 2.947s1.3 2.947 2.893 2.947c1.847 0 2.54-1.327 2.647-2.013h-2.647v-1.6h4.406c.041.233.074.467.074.773-.001 2.666-1.787 4.56-4.48 4.56zm11.333-4h-2v2h-1.334v-2h-2v-1.333h2v-2h1.334v2h2v1.333z" />
            </svg>
          </Icon>
          Google
        </Links>
      )}
    />
    <SizeBox />
    <Link to="/verify-Email">
      <Links>
        <Icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
          >
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
          </svg>
        </Icon>
        Email
      </Links>
    </Link>
  </Container>
);

export default SocialLoginPresenter;

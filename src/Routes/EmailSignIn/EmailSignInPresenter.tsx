import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;
interface IProps {
  email: string;
  password: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  loading: boolean;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  email,
  password,
  onChange,
  onSubmit,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | With GO</title>
    </Helmet>
    <Header backTo={"/"} title={"이메일 로그인"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={email}
        placeholder={"이메일"}
        onChange={onChange}
        name={"email"}
      />
      <ExtendedInput
        value={password}
        placeholder={"비밀번호"}
        onChange={onChange}
        name={"password"}
        type="password"
      />
      <Button
        disabled={loading}
        value={loading ? "확인중" : "입력"}
        onClick={null}
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;

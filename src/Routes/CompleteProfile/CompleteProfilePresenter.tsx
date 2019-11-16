import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import styled from "../../typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;
interface IProps {
  onSubmit: MutationFn;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  profilePhoto: string;
  uploading: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
const CompleteProfilePresenter: React.SFC<IProps> = ({
  email,
  firstName,
  onInputChange,
  onSubmit,
  lastName,
  loading,
  password,
  profilePhoto,
  uploading
}) => (
  <Container>
    <Helmet>
      <title>Complete Profile | With Go</title>
    </Helmet>
    <Header backTo={"/"} title={"프로필 작성"} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput
        uploading={uploading}
        fileUrl={
          profilePhoto !== ""
            ? profilePhoto
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ60h-u8kFlaTPtpdj36CjCYKclyhIudByBUmqFYDJAI0yOXSN6w"
        }
        onChange={onInputChange}
      />
      <ExtendedInput
        value={firstName}
        placeholder={"이름"}
        onChange={onInputChange}
        type={"text"}
        name={"firstName"}
      />
      <ExtendedInput
        value={lastName}
        placeholder={"성"}
        onChange={onInputChange}
        type={"text"}
        name={"lastName"}
      />
      <ExtendedInput
        value={email}
        placeholder={"이메일"}
        onChange={onInputChange}
        type={"email"}
        name={"email"}
      />
      <ExtendedInput
        value={password}
        placeholder={"비밀번호"}
        onChange={onInputChange}
        type={"password"}
        name={"password"}
      />
      <Button value={loading ? "생성중..." : "생성하기"} onClick={null} />
    </ExtendedForm>
  </Container>
);

export default CompleteProfilePresenter;

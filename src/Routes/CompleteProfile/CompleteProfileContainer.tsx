import axios from "axios";
import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries";
import { emailSignUp, emailSignUpVariables } from "../../types/api";
import CompleteProfilePresenter from "./CompleteProfilePresenter";
import { EMAIL_SIGN_UP } from "./CompleteProfileQueries.queries";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePhoto: string;
  uploading: boolean;
}
interface IProps extends RouteComponentProps<any> {}

class CompleteProfileMutation extends Mutation<
  emailSignUp,
  emailSignUpVariables
> {}

class CompleteProfileContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: props.location.state.phoneNumber,
      profilePhoto: "",
      uploading: false
    };
  }

  public render() {
    const { history } = this.props;
    const {
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      profilePhoto,
      uploading
    } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <CompleteProfileMutation
            mutation={EMAIL_SIGN_UP}
            variables={{
              email,
              firstName,
              lastName,
              password,
              phoneNumber,
              profilePhoto
            }}
            onCompleted={data => {
              const { EmailSignUp } = data;
              if (EmailSignUp.token) {
                logUserIn({
                  variables: {
                    token: EmailSignUp.token
                  }
                });
                history.push({
                  pathname: "/verify-email"
                });
              }
              toast.success(`이메일 인증을 해주세요.`);
            }}
          >
            {(completeProfileFn, { loading }) => (
              <CompleteProfilePresenter
                profilePhoto={profilePhoto}
                uploading={uploading}
                onSubmit={completeProfileFn}
                onInputChange={this.onInputChange}
                loading={loading}
                email={email}
                firstName={firstName}
                lastName={lastName}
                password={password}
              />
            )}
          </CompleteProfileMutation>
        )}
      </Mutation>
    );
  }
  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value, files }
    } = event;
    if (files) {
      this.setState({
        uploading: true
      });
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "942656699723426");
      formData.append("upload_preset", "meoanioj");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/ddpk05ikd/image/upload",
        formData
      );
      if (secure_url) {
        this.setState({
          profilePhoto: secure_url,
          uploading: false
        });
      }
    }
    this.setState({
      [name]: value
    } as any);
  };
}

export default CompleteProfileContainer;

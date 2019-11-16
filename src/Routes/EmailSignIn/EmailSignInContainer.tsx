import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries";
import { emailSignIn, emailSignInVariables } from "../../types/api";
import EmailSignInPresenter from "./EmailSignInPresenter";
import { EMAIL_LOGIN } from "./EmailSignInQueries.queries";

interface IState {
  email: string;
  password: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<emailSignIn, emailSignInVariables> {}

class EmailSignInContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    password: ""
  };
  public render() {
    const { email, password } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <VerifyMutation
            mutation={EMAIL_LOGIN}
            variables={{
              email,
              password
            }}
            onCompleted={data => {
              const { EmailSignIn } = data;
              if (EmailSignIn.ok) {
                if (EmailSignIn.token) {
                  logUserIn({
                    variables: {
                      token: EmailSignIn.token
                    }
                  });
                  toast.success("로그인에 성공했습니다.");
                }
              } else {
                toast.error(EmailSignIn.error);
              }
            }}
          >
            {(mutation, { loading }) => (
              <EmailSignInPresenter
                email={email}
                password={password}
                onSubmit={mutation}
                onChange={this.onInputChange}
                loading={loading}
              />
            )}
          </VerifyMutation>
        )}
      </Mutation>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default EmailSignInContainer;

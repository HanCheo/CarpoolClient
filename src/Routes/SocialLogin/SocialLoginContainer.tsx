import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "src/sharedQueries";
import { facebookConnect, facebookConnectVariables } from "src/types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries.queries";

class LoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {
  callback: (response) => void;
}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    fbId: "",
    firstName: "",
    lastName: ""
  };
  public facebookMutation: MutationFn;
  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LoginMutation
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { FacebookConnect } = data;
              if (FacebookConnect.ok) {
                logUserIn({
                  variables: {
                    token: FacebookConnect.token
                  }
                });
              } else {
                toast.error(FacebookConnect.error);
              }
            }}
          >
            {(facebookMutation, {}) => {
              this.facebookMutation = facebookMutation;
              return <SocialLoginPresenter loginCallback={this.callback} />;
            }}
          </LoginMutation>
        )}
      </Mutation>
    );
  }

  public callback = response => {
    const { name, first_name, last_name, email, id, accessToken } = response;
    if (accessToken) {
      toast.success(`${name}님 환영합니다.`);
      this.facebookMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name
        }
      });
    } else {
      toast.error("로그인에 실패했습니다. :(");
    }
  };
}

export default SocialLoginContainer;
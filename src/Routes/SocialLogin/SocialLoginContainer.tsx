import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "src/sharedQueries";
import {
  facebookConnect,
  facebookConnectVariables,
  googleConnect,
  googleConnectVariables
} from "src/types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT, GOOGLE_CONNECT } from "./SocialLoginQueries.queries";

class GgLoginMutation extends Mutation<googleConnect, googleConnectVariables> {}
class FbLoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps> {
  public googleMutation: MutationFn;
  public facebookMutation: MutationFn;

  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <GgLoginMutation
            mutation={GOOGLE_CONNECT}
            onCompleted={data => {
              const { GoogleConnect } = data;
              if (GoogleConnect.ok) {
                logUserIn({
                  variables: {
                    token: GoogleConnect.token
                  }
                });
                toast.success("인증에 성공했습니다.");
              } else {
                toast.error(GoogleConnect.error);
              }
            }}
          >
            {(googleMutation, { loading }) => (
              <FbLoginMutation
                mutation={FACEBOOK_CONNECT}
                onCompleted={data => {
                  const { FacebookConnect } = data;
                  if (FacebookConnect.ok) {
                    logUserIn({
                      variables: {
                        token: FacebookConnect.token
                      }
                    });
                    toast.success("인증에 성공했습니다.");
                  } else {
                    toast.error(FacebookConnect.error);
                  }
                }}
              >
                {(facebookMutation, { }) => {
                  this.googleMutation = googleMutation;
                  this.facebookMutation = facebookMutation;
                  return (
                    <SocialLoginPresenter
                      ggloginCallback={this.ggcallback}
                      fbloginCallback={this.fbcallback}
                    />
                  );
                }}
              </FbLoginMutation>
            )}
          </GgLoginMutation>
        )}
      </Mutation>
    );
  }

  public ggcallback = response => {
    if (response.profileObj.googleId) {
      const {
        name,
        familyName,
        givenName,
        email,
        imageUrl,
        googleId
      } = response.profileObj;
      const { accessToken } = response;
      if (accessToken) {
        toast.success(`${name}님 환영합니다.`);
        this.googleMutation({
          variables: {
            email,
            firstName: givenName,
            ggId: googleId,
            lastName: familyName,
            profilePhoto: imageUrl
          }
        });
      }
    } else {
      toast.error("로그인에 실패했습니다. :(");
    }
  };
  public fbcallback = response => {
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

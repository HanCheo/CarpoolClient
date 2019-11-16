import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { completeEmailVerification } from "../../types/api";
import VerifyEmailPresenter from "./VerifyEmailPresenter";
import { VERIFY_EMAIL } from "./VerifyEmailQueries.queries";

interface IState {
  verificationKey: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<completeEmailVerification> {}

class VerifyEmailContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      verificationKey: ""
    };
  }
  public render() {
    const { history } = this.props;
    const { verificationKey } = this.state;
    return (
      <VerifyMutation
        mutation={VERIFY_EMAIL}
        variables={{
          key: verificationKey
        }}
        onCompleted={data => {
          const { CompleteEmailVerification } = data;
          if (CompleteEmailVerification.ok) {
            toast.success("계정 생성이 완료되었습니다.");
            history.push("/");
          } else {
            toast.error(CompleteEmailVerification.error);
          }
        }}
      >
        {(mutation, { loading }) => (
          <VerifyEmailPresenter
            onSubmit={mutation}
            onChange={this.onInputChange}
            verificationKey={verificationKey}
            loading={loading}
          />
        )}
      </VerifyMutation>
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

export default VerifyEmailContainer;

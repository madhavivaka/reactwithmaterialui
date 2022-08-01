import { Google } from "react-oauth2";
import { Component } from "react";

export default class LoginWithOAuth extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: {
      id: "",
      name: "",
      email: "",
      gender: "",
      location: { id: "", name: "" }
    }
  };

  google(err, res) {
    if (!err) {
      this.setState({ data: res.profile });
    } else {
      this.setState({ data: "something happen wrong" });
    }
  }

  render() {
    return (
      <div>
        <br />
        <Google
          url={"http://localhost:3000"}
          clientId={
            "305504033223-16bn629q68os1b2og9b2jtdqd03pcb2n.apps.googleusercontent.com"
          }
          clientSecret={"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"}
          redirectUri={"http://localhost:3000"}
          scope={["https://www.googleapis.com/auth/userinfo.email"]}
          width={300}
          height={300}
          callback={this.google}
          style={{ color: "green" }}
        >
          Login Google With OAuth2.0
        </Google>
        <hr />
        {JSON.stringify(this.state)}
      </div>
    );
  }
}



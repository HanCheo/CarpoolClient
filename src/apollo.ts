import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
    //기본 클라이언트 상태정의
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("jwt"))
      }
    },
    //resolver 정의
    resolvers: {
      Mutation: {
        //유저 로그인
        logUserIn: (_, { token }, { cache }) => {
          localStorage.setItem("jwt", token);
          cache.writeDate({
            date: {
              auth: {
                __typename: "Auth",
                isLoggedIn: true
              }
            }
          });
          return null;
        },
        //유저 로그아웃
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem("jwt");
          cache.writeDate({
            data: {
              __typename: "Auth",
              isLoggedIn: false
            }
          });
          return null;
        }
      }
    }
  },
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  uri: "http://localhost:4000/graphql"
});

export default client;

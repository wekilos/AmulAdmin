// import "./PrivateRoute.css";
// import React, { Suspense } from "react";
// import { Route, useHistory } from "react-router-dom";

// import { Layout } from "antd";
// import { isLogin } from "../utils/index";
// import Sidebar from "../components/sidebar";
// import Headers from "../components/header";
// import Loading from "../components/loading";
// const { Content } = Layout;

// const PrivateRoute = ({ component: Component, ...rest }, login) => {
//     const history = useHistory();
//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 isLogin() ? (
//                     <Layout
//                         className="layout flex"
//                         style={{
//                             height: "100vh",
//                         }}
//                     >
//                         <Headers />
//                         <Layout className="flex w-full mt-[65px]">
//                             <Suspense fallback={<Loading />}>
//                                 <Sidebar />
//                             </Suspense>
//                             <Content
//                                 style={{
//                                     margin: "10px 10px 15px",
//                                     backgroundColor: "white",
//                                 }}
//                                 className="w-full"
//                             >
//                                 <Component {...props} />
//                             </Content>
//                         </Layout>
//                     </Layout>
//                 ) : (
//                     history.push({
//                         pathname: "/",
//                     })
//                 );
//             }}
//         />
//     );
// };

// export default PrivateRoute;

import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import Loading from "../components/loading";
import { useHistory } from "react-router-dom";

import "antd/dist/antd.css";
import { isLogin } from "../utils/index";
import SiderDemo from "../components/sidebar";
import { useSizeComponents } from "../components/sizeComponent";
const Headers = React.lazy(() => import("../components/header"));

const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
  const history = useHistory();

  const [width, height] = useSizeComponents();
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() || true ? (
          <Layout>
            <Suspense fallback={<Loading />}>
              <Headers />
            </Suspense>
            <div
              className="site-layout"
              style={{
                display: "inline-flex",
                width: "100%",
                margin: "65px auto 0",
              }}
            >
              {width > 500 && (
                <div
                  style={{
                    minHeight: "100vh",
                    // width:"25%",
                    width: "25%",
                    position: "sticky",
                    top: "10px",
                    paddingRight: "15px",
                    marginTop: "5px",
                  }}
                >
                  <Suspense fallback={<Loading />}>
                    <SiderDemo />
                  </Suspense>
                </div>
              )}

              <div
                style={{
                  minHeight: "100vh",
                  minWidth: "75%",
                }}
                className="site-layout-background main_content"
              >
                <Component {...props} />
              </div>
            </div>
          </Layout>
        ) : (
          history.push({
            pathname: "/login",
          })
        )
      }
    />
  );
};

export default PrivateRoute;

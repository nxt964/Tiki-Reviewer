import { Fragment } from "react";
// import Header from "../../components/Header";
import NavBar from "../../components/NavBar";

const DefaultLayout = ({ children }) => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <NavBar />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
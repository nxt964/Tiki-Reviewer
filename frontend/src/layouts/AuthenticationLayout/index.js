import Logo from "../../components/Logo";
import styles from './AuthenticationLayout.module.css'

const AuthenticationLayout = ({children}) => {
    return (
        <div className="container mt-4">
            <Logo className=""/>
            <div className="mx-lg-5 px-md-5">{children}</div>
        </div>
        
    );
}
export default AuthenticationLayout;
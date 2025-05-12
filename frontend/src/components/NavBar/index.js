import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './NavBar.module.css';
import Logo from '../../images/account-logo.png';
import { getCurrentUser, removeCurrentUser } from "../../utils/userStorage";
import toast from "react-hot-toast";

const NavBar = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    const handleNavigate = (path) => {
        if (path === '/history' && !currentUser) {
            toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
            return;
        }
        navigate(path);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        removeCurrentUser();
        navigate('/');
    }

    return (
        <div className={styles["navbar-container"]}>
            <div className="container d-flex justify-content-between align-items-center">
                <div className={styles['logo-container']} onClick={() => handleNavigate('/')} >
                    <img src="/logo192.png" alt="Sentiment Analysis" className={styles["logo"]} />
                    <div>
                        <p className="text-center">Sentiment Analysis</p>
                    </div>
                </div>
                <div className="d-flex gap-3">
                    {currentUser
                        ? (
                            <>
                                <div className={styles['text']} onClick={() => handleNavigate('/history')}><span>Lịch sử</span></div>
                                <div className={styles['profile-logo-container']}>
                                    <img src={Logo} alt="Profile" className={styles["profile-logo"]} />
                                    <div className={styles['dropdown-menu']}>
                                        <div onClick={() => handleNavigate('/account')}>Tài khoản</div>
                                        <div onClick={() => handleLogout()}>Đăng xuất</div>
                                    </div>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div className={styles['text']} onClick={() => handleNavigate('/history')}><span>Lịch sử</span></div>
                                <div className={styles['text']} onClick={() => handleNavigate('/signin')}><span>Đăng nhập</span></div>
                                <div className={styles['text']} onClick={() => handleNavigate('/signup')}><span>Đăng ký</span></div>
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;

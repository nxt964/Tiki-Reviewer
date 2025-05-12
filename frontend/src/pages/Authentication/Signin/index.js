import { Link, useNavigate } from 'react-router-dom';
import styles from '../Authentication.module.css';
import { useRef, useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
// import {CurrentUserContext} from '../../context/CurrentUserContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import toast from 'react-hot-toast';
import { removeCurrentUser, setCurrentUser } from '../../../utils/userStorage';

const REACT_APP_BASEURL = "http://localhost:3001";
const reqAPI = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null,
};

function Signin() {
    const handleSignIn = (e) => {
        e.preventDefault();

        const dataSignIn = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value
        };

        emailRef.current.value = '';
        emailRef.current.focus();
        passwordRef.current.value = '';
        
        setFetch({...fetch, body: JSON.stringify(dataSignIn)});
        setShow(false);
    }

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [show, setShow] = useState(false);
    const [fetch, setFetch] = useState(reqAPI);
    const navigate = useNavigate();
    // const {setCurrentUser} = useContext(CurrentUserContext);


    // Call API
    const {payload, status} = useFetch(`${REACT_APP_BASEURL}/api/v1/auth/signin`, fetch);

    useEffect(() => {
        if (status === 'success'){
            toast.success('Đăng nhập thành công');
            setCurrentUser(payload);
            navigate('/');
        }
        else if (status !== 'fail') {
            toast.error('Tên đăng nhập hoặc mật khẩu không đúng');
        }
        setFetch({...fetch, body:null});
    }, [payload, status])

    return (
        <div className="py-4 p-md-5 mx-lg-5">
            <form className = {styles.form + " " + "p-3 px-md-4 px-lg-5"} onSubmit={handleSignIn}>
                <div className={styles.email}>
                    <label htmlFor='emailInput'>
                        Email
                        <span>*</span>
                    </label>
                    <input className={styles['email-input']} 
                           ref={emailRef}
                           id='emailInput' 
                           type='email' 
                           placeholder='Email' 
                           required
                    />
                </div>
                <div className={styles.password}>
                    <label htmlFor='passwordInput'>
                        Mật khẩu
                        <span>*</span>
                    </label>
                    <div className={styles['input-icon-container']}>
                        <input className={styles['password-input']}
                            ref={passwordRef}
                            id='passwordInput' 
                            type={show ? 'input' : 'password'}
                            placeholder='Mật khẩu' 
                            required
                        />  
                        <FontAwesomeIcon className={styles.icon} icon={show ? faEyeSlash : faEye} onClick={() => setShow(!show)}/>
                    </div>
                </div>
                <div className={styles.container}>
                    <button type='submit' className={styles.btn}>
                        ĐĂNG NHẬP
                    </button>
                </div>
                <div className="text-center d-flex gap-3 flex-wrap justify-content-center">
                    <span className="text-dark">Bạn chưa có tài khoản?</span>
                    <Link to='/signup' className={`${styles.link} ${styles['signup-link']}`}>Đăng ký ngay</Link>
                </div>
            </form>
        </div>
    );
}

export default Signin;
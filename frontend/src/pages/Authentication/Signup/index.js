import { Link, useNavigate } from 'react-router-dom';
import styles from '../Authentication.module.css'
import { useRef, useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
import toast from 'react-hot-toast';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const REACT_APP_BASEURL = "http://localhost:3001";
const reqAPI = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null,
};

function SignUp() {
    const handleValidatePassword = (password) => {
        if (password === '')
          setValidation(false);
        else if (password.length < 8)
          setValidation(false);
        else 
          setValidation(true);
    }

    const handleConfirmPassword = (repassword) => {
        if (repassword === '')
          setConfirm(false);
        else if (repassword === passwordRef.current.value)
          setConfirm(true);
        else
          setConfirm(false);
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        const newDataSignUp = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
            'name': nameRef.current.value,
        }
        
        emailRef.current.value = '';
        passwordRef.current.value = '';
        repasswordRef.current.value = '';
        emailRef.current.focus();
        
        setFetch({...fetch, body: JSON.stringify(newDataSignUp)});
    }

    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const [chkbox, setChkbox] = useState(false);
    const [validation, setValidation] = useState(true);
    const [confirm, setConfirm] = useState(true);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const repasswordRef = useRef(null);

    const [fetch, setFetch] = useState(reqAPI);

    // Fetch API
    const {payload, status} = useFetch(`${REACT_APP_BASEURL}/api/v1/auth/signup`, fetch);
    useEffect(() => {
        if (status === 'success'){
            toast.success('Đăng ký thành công');
            navigate('/signin');
        }
        else if (status !== 'fail') {
            toast.error('Email đã tồn tại');
        }
        setFetch({...fetch, body:null})
    }, [payload, status])

    return (
        <div className="py-4 p-md-5 mx-lg-5">
            <form className={styles.form + " " + "p-3 px-md-4 px-lg-5"} onSubmit={handleSignUp}>
                <div className={styles.username}>
                    <label htmlFor='usernameInput'>
                        Họ và tên
                        <span>*</span>
                    </label>
                    <input ref={nameRef}
                        className={styles['username-input']}
                        id='usernameInput'
                        placeholder='Họ và tên'
                        required
                    />
                </div>
                <div className={styles.email}>
                    <label htmlFor='emailInput'>
                        Email
                        <span>*</span>
                    </label>
                    <input ref={emailRef}
                        className={styles['email-input']}
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
                        <input ref={passwordRef}
                            className={styles['password-input']}
                            id='passwordInput'
                            type={showPass ? 'input' : 'password'}
                            placeholder='Mật khẩu'
                            onChange={password => handleValidatePassword(password.target.value)}
                            required
                        />
                        <FontAwesomeIcon className={styles.icon} icon={showPass ? faEyeSlash : faEye} onClick={() => setShowPass(!showPass)}/>
                    </div>
                    {validation || <p className={styles.invalid}>Mật khẩu ít nhất 8 ký tự</p>}
                </div>
                <div className={styles.password}>
                    <label htmlFor='repasswordInput'>
                        Xác nhận mật khẩu
                        <span>*</span>
                    </label>
                    <div className={styles['input-icon-container']}>
                        <input ref={repasswordRef}
                            className={styles['password-input']}
                            id='repasswordInput'
                            type={showRePass ? 'input' : 'password'}
                            placeholder='Nhập lại mật khẩu'
                            onChange={password => handleConfirmPassword(password.target.value)}
                            required
                        />
                        <FontAwesomeIcon className={styles.icon} icon={showRePass ? faEyeSlash : faEye} onClick={() => setShowRePass(!showRePass)}/>
                    </div>
                    {confirm || <p className={styles.invalid}>Mật khẩu không trùng khớp</p>}
                </div>
                <div className={styles.container }>
                    <input type="checkbox"
                        className={styles['checkbox-input']}
                        checked={chkbox}
                        onChange={v => setChkbox(v.target.checked)} />
                    <p className={styles['policy-content'] + " m-0"}>Tôi đã đọc và đồng ý với các
                        <Link to={'/about-us'} className={styles.link}> Quy định & Điều khoản </Link>
                        và
                        <Link to={'/about-us'} className={styles.link}> Chính sách bảo mật </Link>
                        của Sentiment Analysis
                    </p>
                </div>
                <div className={styles.container}>
                    <button type='submit'
                        className={styles.btn}
                        disabled={
                               !chkbox
                            || !validation
                            || !confirm
                            || repasswordRef.current.value === ''
                            || passwordRef.current.value === ''
                        }>
                        ĐĂNG KÝ
                    </button>
                </div>
                <div className="text-center d-flex gap-3 flex-wrap justify-content-center">
                    <span className="text-dark">Bạn đã có tài khoản?</span>
                    <Link to='/signin' className={`${styles.link} ${styles['signup-link']}`}>Đăng nhập ngay</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
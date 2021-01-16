import React from 'react';
import MainPageForm from './MainPageForm';
import { useCustomFormAndValidation } from '../hooks/useCustomForm';
import * as auth from '../utils/auth.js'
import { useHistory } from "react-router-dom";

function Login(props) {
    const history = useHistory();
    const { values, handleChange, errors, isValid, resetForm } = useCustomFormAndValidation();

    React.useEffect(() => {
        resetForm()
    }, [resetForm])

    function handleSubmit(event) {
        event.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        auth.authorize(values)
            .then((data) => {
                if (data) {
                    props.handleLogin();
                    history.push('/');                    
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="content">
            <MainPageForm
                className={'login'}
                title="Вход"
                btnText="Войти"
                onSubmit={handleSubmit}
                isDisabled={isValid}
            >
                <>
                    <input
                        type="email"
                        id="email"
                        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                        name="email"
                        value={values.email || ''}
                        placeholder="Email"
                        onChange={handleChange}
                        className="form-auth__input form-auth__input_type_email"
                        required
                        minLength="2"
                        maxLength="70" />
                    <span id="email-input-error" className="form-auth__input-error">{errors.email || ''}</span>
                    <input
                        type="password"
                        id="pass"
                        name="password"
                        onChange={handleChange}
                        placeholder="Пароль"
                        className="form-auth__input form-auth__input_type_password"
                        value={values.password || ""}
                        required
                        minLength="5"
                        maxLength="20" />
                    <span id="password-input-error" className="form-auth__input-error">{errors.password || ''}</span>
                </>
            </MainPageForm>
        </div>
    )
}

export default Login;
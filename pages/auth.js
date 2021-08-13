import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Auth from '../Store/Auth';
import style from '../styles/Auth.module.sass';
import Link from 'next/link';

const LoginForm = observer(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [screen, setScreen] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'))
            Auth.checkAuth()
        }
    }, [])

    const Validate = () => {
        if (email.length === 0) {
            setError('Поле ')
        }

        if (email.indexOf('@') !== -1) {

        }
    }

    const Action = async () => {
        if (screen === 1) {
            await Auth.checkUser(email);
            setScreen(2)
        }

        if (screen === 2) {
            Auth.exists ? Auth.login(email, password) : Auth.register(email, password)
        }
    }

    if (!Auth.isAuth) {
        if (!Auth.loading) {
            return (
                <section className={style.auth_section}>
                    <h1 className={style.auth_title}>{screen === 1 ? 'Вход | Регистрация (beta)' : 'Введите пароль'}</h1>
                    <div className={style.auth_form}>
                        {console.log(Auth.exists)}
                        <input /*autoComplete='email'*/ style={{ display: screen === 1 ? 'block' : 'none' }} value={email} className={style.auth_input} onChange={e => setEmail(e.target.value)} type='email' name='email' placeholder='E-mail'></input>
                        <input autoComplete={Auth.exists ? 'current-password' : 'new-password'} style={{ display: screen === 2 ? 'block' : 'none' }} value={password} className={style.auth_input} onChange={e => setPassword(e.target.value)} type='password' name='password' placeholder='Пароль'></input>
                        {screen === 1 ?
                            (<button type='submit' className={`${style.action_button}${/*email.length === 0 ? ` ${*/' ' + style.disabled/*}` : ''*/}`} onClick={Action} disabled={true} /*disabled={email.length === 0 ? true : false}*/>Скоро!</button>)
                            :
                            (<button type='submit' className={style.action_button} onClick={Action}>{Auth.exists ? 'Войти' : 'Зарегистрироваться'}</button>)}

                    </div>
                </section>
            )
        } else {
            return (
                <section className={style.auth_section}></section>
            )
        }
    } else {
        return (
            <div>
                {Auth.isAuth ? `Пользователь авторизован ${Auth.user.email}` : 'Пользователь не авторизован'}
                <button className={style.action_button} onClick={() => { Auth.logout(email, password); setScreen(1) }}>Выйти</button>
            </div>
        )
    }
}
)

export default LoginForm

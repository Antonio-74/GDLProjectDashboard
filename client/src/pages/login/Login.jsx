import './login.css';

const Login = () => {
    return (
        <div className="container">
            <div className="login-container">
                <div className="left">
                    <h2 className='left-title'>GDLWEBCAMP Dashboard</h2>
                </div>
                <div className="right">
                    <h2 className='right-title'>Login</h2>
                    <form>
                        <input 
                            type='text'
                            placeholder='Username'
                        />
                        <input 
                            type='password'
                            placeholder='Password'
                        />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
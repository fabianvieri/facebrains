import React from 'react';
//onroutechange
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onPassChange = (e) => {
        this.setState({ password: e.target.value });
    }

    onSubmit = (e) => {
        fetch('https://facebrains-server.herokuapp.com/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: this.state.password,
                email: this.state.email
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loaduser(user);
                    this.props.onroutechange('home');
                }
            });
        e.preventDefault();
    }

    render() {
        const { onroutechange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure" >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPassChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.onSubmit}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onroutechange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}

export default SignIn;
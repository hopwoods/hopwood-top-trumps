// import { useAppState } from '../../Hooks/UseAppState' // Will be needed later
// import './RegisterPage.styles.ts' // Or Griffel styles here
// React removed

// TODO: Implement actual form, styling, and connect to appMachine
const RegisterPage = () => {
  // const { send, getAppStateValue } = useAppState()
  // const error = getAppStateValue('error')

  return (
    <div>
      <h2>Register</h2>
      {/* {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}
      <form onSubmit={(e) => e.preventDefault() /* Handle actual submission later */}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <button type="submit">Register</button>
      </form>
      {/* <button onClick={props.onSwitchToLogin}>Already have an account? Login</button> */}
    </div>
  )
}

export default RegisterPage

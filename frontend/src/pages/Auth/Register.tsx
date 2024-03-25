import { Link } from "react-router-dom";

export default function RegisterPage() {
  return <div>
    <h1>Register</h1>
    <p>Join us</p>

    <form>
      <h3>Username</h3>
      <input type="text" />
      <h3>Password</h3>
      <input type="password"/>
      <button type="submit">Register</button>
    </form>
    <Link to="/login">Already have an account?</Link>
  </div>
}
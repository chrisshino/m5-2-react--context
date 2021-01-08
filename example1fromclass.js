export const UserContext = React.createContext();
const App = () => {
  const [
    user,
    setUser
  ] = React.useState({ username: 'Alfalfa' });
  return <UserContext.Provider value={{ user, setUser }}>
					<Home />
				</UserContext.Provider>
}
const Home = () => {
  return (
    <>
      <Header />
      <MainContent />
    </>
  )
}
const Header = () => {
  return (
    <header>
      <Navigation />
    </header>
  )
}
// src/Navigation.js
import UserContext from './src/App';
const Navigation = () => {
	const {user, setUser} = React.useContext(UserContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about">
            About
          </Link>
        </li>
        {user && (
          <li>
            <button
              onClick={() => setUser(null)}
            >
              Log out
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
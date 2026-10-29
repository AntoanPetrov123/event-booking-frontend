import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Home = () => {
    const { isAuthenticated, isAdmin } = useSelector(
        (state: RootState) => state.auth
      );

      console.log('is admin: ', isAdmin);
      
    return <h1>This is Home!</h1>;
};

export default Home;
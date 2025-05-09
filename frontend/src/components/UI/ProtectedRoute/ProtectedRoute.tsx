import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";

interface Props extends React.PropsWithChildren{
    isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({isAllowed, children}) => {

    if(!isAllowed){
        toast.error("Login ot register first");
        return <Navigate to='/login' />;
    }

    return children;
};

export default ProtectedRoute;
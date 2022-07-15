import SignIn from "./SignIn"
import Reset from "./Reset"
import NewPassword from "./NewPassword"
import Admin from "./Admin"


const config = [
    {
        path: '/',
        element: <SignIn />
    },
    {
        path: '/reset',
        element: <Reset />
    },
    {
        path: '/new-password',
        element: <NewPassword />
    },
    {
        path: '/admin',
        element: <Admin />
    }
]

export default config
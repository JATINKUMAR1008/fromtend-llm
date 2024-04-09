import { Provider } from "react-redux"
import { store } from "../reducers/store"

interface IProps {
    children: React.ReactNode
}
export const ReduxProvider = ({ children }: IProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
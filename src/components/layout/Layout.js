import { MainNavigation } from "./MainNavigation";


export const Layout = (props) => {
    return (
        <div>
            <MainNavigation />
            <main style={{marginTop: "66px"}}>{[props.children]}</main>
        </div>
    );
}
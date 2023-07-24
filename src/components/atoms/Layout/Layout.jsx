import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            {/* <Header /> */}
            <div id="wrap">
                <main>
                    <Outlet />
                </main>
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default Layout;

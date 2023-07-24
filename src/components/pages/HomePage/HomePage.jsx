import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/game');
    };
    return (
        <>
            <h1>Hello! Nice Catch :-)</h1>
            {/* <Link to="/game">canvas</Link> */}
            <p onClick={handleClick}>canvas 작업 페이지 클릭!</p>
        </>
    );
};
export default Home;

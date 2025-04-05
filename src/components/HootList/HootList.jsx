import { Link, unstable_HistoryRouter } from 'react-router';

const HootList = (props) => {
    return (
        <main>
            {
                props.hoots.map((hoot) => (
                    <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
                        <header>
                            <h2>{hoot.title}</h2>
                            <p>
                                {`${hoot.author.username} posted on
                                ${new Date(hoot.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{hoot.text}</p>
                    </Link>
                ))
            }
        </main>
    );
};

export default HootList;
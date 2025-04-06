import { Link } from 'react-router-dom';

const OutfitList = ({ outfits }) => {
  return (
    <main>
      {outfits.length === 0 ? (
        <p>No outfits to display yet!</p>
      ) : (
        outfits.map((outfit) => (
          <Link key={outfit._id} to={`/outfits/${outfit._id}`}>
            <header>
              <h2>{outfit.title}</h2>
              <p>
                {`${outfit.author?.username || 'Unknown'} posted on 
                    ${new Date(outfit.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{outfit.description}</p>
          </Link>
        ))
      )}
    </main>
  );
};

export default OutfitList;
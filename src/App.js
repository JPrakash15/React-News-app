
import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
    //state
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('react');
    const [url,setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
    const [loading, setLoading] =useState(false);

    // fetch news funtion
    const fetchNews = () => {
      //set loading true
      setLoading(true);

      fetch(url)
      .then( results => results.json() )
      // .then( data => console.log(data))
      .then(data => (setNews(data.hits), setLoading(false)) )
      .catch( error => console.log(error));
    };

    useEffect( () => {
      fetchNews();
    }, [url]);

    const handleChange = (e) => {
      setSearchQuery( e.target.value)
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // fetchNews();
      setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    };

    const showLoading = () => {
      return loading ? (
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg> 
      ) : (
        <div>
          {news.map( (n, i) => (<p key={i}>{n.title}</p>) )}
        </div> 
      );
    };


  return (
    <div>
      <h1>News</h1>
        <div className='search'>

          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Search...' value={searchQuery} onChange={handleChange}/>
            <button className='btn' type='submit'>Search</button>
          </form>

        </div>
        <div className='loader'>
          {showLoading()}
        </div>
    </div>
  );
}

export default App;

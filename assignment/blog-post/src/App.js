import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
// import { BrowserRouter, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Homepage from './Pages/Homepage';
// import Blogspage from './Pages/Blogspage';

function App() {
  return (
    // <BrowserRouter>
    //     <div>
    //       <Header/>
    //       <Route path='/' component={Homepage} exact />
    //       <Route path='/blogs' component={Blogspage} />

          
    //     </div>
    // </BrowserRouter>

    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Blogs/>
        </div>
        <div className='col-md-4'>
          <CreateBlog/>
        </div>
      </div>      
    </div>

  );
}

export default App;

import FeedbackDisplay from './components/FeedbackDisplay';
import Sort from './components/Sort';
import Nav from './components/Nav';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts, getAllCategories } from './features/social/socialSlice';

function App() {
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(0);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className='min-h-full w-screen overflow-x-hidden bg-grey-white md:pt-14 xl:flex xl:h-screen xl:w-screen xl:justify-center xl:gap-[2.08%]'>
      <div className='xl:w-[18.33%]'>
        <Nav toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      </div>
      <div className={`xl:w-[57.29%] ${toggleMenu ? 'brightness-50' : ''}`}>
        <Sort />
        <FeedbackDisplay
          selectedFeedback={selectedFeedback}
          setSelectedFeedback={setSelectedFeedback}
        />
      </div>
    </div>
  );
}

export default App;

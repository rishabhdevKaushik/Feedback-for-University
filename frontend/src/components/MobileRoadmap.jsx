import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import whitearrow from '../assets/whitearrow.png';
import LinkButton from './LinkButton';
import DisplayRoadmapMobile from './DisplayRoadmapMobile';

function MobileRoadmap() {
  const [selectedRoadmap, setSelectedRoadmap] = useState('in-progress');
  const navigate = useNavigate();

  return (
    <main>
      <nav className='flex h-[6.25rem] items-center justify-between bg-blue px-6 py-6 text-white xs:px-3 s:px-6'>
        <div>
          <button
            className='mb-1 flex items-center gap-2 bg-transparent border-none cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <img src={whitearrow} alt='back btn' />
            <p className='px13 font-bold'>Go Back</p>
          </button>
          <h1 className='text-lg font-bold tracking-[-0.25px]'>Roadmap</h1>
        </div>
        <Link
          to='/addfeedback'
          className='px13 flex h-10 w-[8.375rem] items-center justify-center rounded-[0.625rem] bg-purple font-bold text-white'
        >
          + Add Feedback
        </Link>
      </nav>
      <LinkButton
        selectedRoadmap={selectedRoadmap}
        setSelectedRoadmap={setSelectedRoadmap}
      />
      <DisplayRoadmapMobile selectedRoadmap={selectedRoadmap} />
    </main>
  );
}

export default MobileRoadmap;

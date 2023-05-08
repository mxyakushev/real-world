import { Dispatch, SetStateAction } from 'react';

export const usePagination = (
  setOffset: Dispatch<SetStateAction<number>>,
  offset: number,
  setRange: Dispatch<SetStateAction<number>>,
  range: number,
  maxRangeNumber: number
) => {
  const handlePrevious = () => {
    setOffset((prevState) => (prevState === 0 ? prevState : prevState - 1));
    if (range - 4 === offset && offset > 2) {
      setRange(offset + 2);
    }
    if (offset !== 0) {
      window.scrollTo({ top: 0 });
    }
  };

  const handlePageClick = (number: number) => {
    setOffset(number - 1);
    if (range === number && number + 2 <= maxRangeNumber) {
      setRange(number + 2);
    } else if (range === number && number !== maxRangeNumber) {
      setRange(number + 1);
    }
    if (range - 4 === number && number > 2) {
      setRange(number + 2);
    }
    window.scrollTo({ top: 0 });
  };

  const handleNext = () => {
    setOffset((prevState) => prevState + 1);
    if (range === offset + 2) {
      setRange(offset + 4);
    }
    window.scrollTo({ top: 0 });
  };

  return { handlePrevious, handlePageClick, handleNext };
};

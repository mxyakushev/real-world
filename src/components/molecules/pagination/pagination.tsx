import { Dispatch, FC, SetStateAction } from 'react';
import { Box, Button, useColorMode } from '@chakra-ui/react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { usePagination } from 'hooks';

interface IProps {
  setOffset: Dispatch<SetStateAction<number>>;
  offset: number;
  setRange: Dispatch<SetStateAction<number>>;
  range: number;
  maxRangeNumber: number;
}

export const Pagination: FC<IProps> = ({ setOffset, offset, setRange, range, maxRangeNumber }) => {
  const { handlePrevious, handlePageClick, handleNext } = usePagination(
    setOffset,
    offset,
    setRange,
    range,
    maxRangeNumber
  );
  const arr = Array.from({ length: maxRangeNumber }, (_, i) => i + 1);
  const { colorMode } = useColorMode();
  const paginationNumbers = arr.length > 5 ? arr.slice(range - 5, range) : arr;

  return (
    <Box mb={6} px={4} display="flex" justifyContent="center">
      <Button
        maxWidth="100px"
        w="100%"
        onClick={handlePrevious}
        disabled={offset === 0 || maxRangeNumber <= 5}
        mr={1}
        px={0}
      >
        <MdArrowBackIos size={18} />
      </Button>
      {paginationNumbers.map((number) => {
        return (
          <Button
            key={number}
            backgroundColor={
              offset === number - 1 ? (colorMode === 'light' ? '#d5d8df' : '#171923') : ''
            }
            maxWidth="50px"
            w="100%"
            px={0}
            onClick={() => handlePageClick(number)}
            mx={1}
          >
            {number}
          </Button>
        );
      })}
      <Button
        maxWidth="100px"
        w="100%"
        minWidth="40px"
        onClick={handleNext}
        disabled={offset + 1 >= maxRangeNumber || maxRangeNumber <= 5}
        ml={1}
        px={0}
      >
        <MdArrowForwardIos size={18} />
      </Button>
    </Box>
  );
};

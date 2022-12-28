import React, { Dispatch, FC, SetStateAction } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

interface IProps {
  setOffset: Dispatch<SetStateAction<number>>;
  offset: number;
  setRange: Dispatch<SetStateAction<number>>;
  range: number;
  maxRangeNumber: number;
}
export const Pagination: FC<IProps> = ({ setOffset, offset, setRange, range, maxRangeNumber }) => {
  const arr = Array.from({ length: maxRangeNumber }, (_, i) => i + 1);
  const paginationNumbers = arr.length > 5 ? arr.slice(range - 5, range) : arr;
  return (
    <Box mb={6} px={4} display="flex" justifyContent="center">
      <Button
        maxWidth="100px"
        w="100%"
        onClick={() => {
          setOffset((prevState) => (prevState === 0 ? prevState : prevState - 1));
          if (range - 4 === offset && offset > 2) {
            setRange(offset + 2);
          }
          if (offset !== 0) {
            window.scrollTo({ top: 0 });
          }
        }}
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
            backgroundColor={offset === number - 1 ? '#d5d8df' : ''}
            maxWidth="50px"
            w="100%"
            px={0}
            onClick={() => {
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
            }}
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
        onClick={() => {
          setOffset((prevState) => prevState + 1);
          if (range === offset + 2) {
            setRange(offset + 4);
          }
          window.scrollTo({ top: 0 });
        }}
        ml={1}
        disabled={offset + 1 >= maxRangeNumber || maxRangeNumber <= 5}
        px={0}
      >
        <MdArrowForwardIos size={18} />
      </Button>
    </Box>
  );
};

import { ChangeEvent, FC, useState } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks';
import { commentArticle } from 'app';

interface CommentFormProps {
  slug: string;
}
export const CommentForm: FC<CommentFormProps> = ({ slug }) => {
  const dispatch = useAppDispatch();
  const [textareaValue, setTextareaValue] = useState('');

  const handleSubmitComment = () => {
    if (textareaValue.length > 0) {
      dispatch(commentArticle({ slug, body: textareaValue }));
    }
    setTextareaValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  return (
    <Box
      textAlign="center"
      mb={5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Textarea
        maxWidth="700px"
        placeholder="Enter the comment"
        mb={3}
        onChange={handleChange}
        value={textareaValue}
      />
      <Button maxWidth="700px" w="100%" onClick={handleSubmitComment}>
        Submit
      </Button>
    </Box>
  );
};

import { useParams } from 'react-router-dom';
import { useAppSelector, useProfileTabData } from 'hooks';
import {
  articlesLikedStateSelector,
  articlesProfileStateSelector,
  loadingArticlesStateSelector,
} from 'app';
import { Box, Heading } from '@chakra-ui/react';
import { ArticleList } from '../article-list';
import { Pagination } from '../../molecules';

const ArticlesProfile = () => {
  const { tabName, username } = useParams();
  const { offset, setOffset, range, setRange } = useProfileTabData(tabName, username);

  const profileArticles = useAppSelector(articlesProfileStateSelector);
  const likedArticles = useAppSelector(articlesLikedStateSelector);
  const isLoading = useAppSelector(loadingArticlesStateSelector);

  const currentArticles = tabName === 'articles' ? profileArticles : likedArticles;

  return (
    <Box>
      {currentArticles?.articlesCount > 0 ? (
        <ArticleList articles={currentArticles?.articles} isLoaded={!isLoading} />
      ) : (
        <Heading textAlign="center">no articles found.</Heading>
      )}
      {!isLoading &&
        currentArticles?.articlesCount > 10 &&
        currentArticles?.articles.length !== 0 && (
          <Pagination
            setOffset={setOffset}
            offset={offset}
            setRange={setRange}
            range={range}
            maxRangeNumber={Math.ceil(currentArticles.articlesCount / 10)}
          />
        )}
      <Box p={10} />
    </Box>
  );
};

export default ArticlesProfile;

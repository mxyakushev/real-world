import { ArticleList, Pagination } from 'components';
import { Box } from '@chakra-ui/react';
import { useAppSelector, useArticleTabData } from 'hooks';
import {
  articlesFeedStateSelector,
  articlesStateSelector,
  articlesTagStateSelector,
  loadingArticlesStateSelector,
} from 'app';
import { useOutletContext, useParams } from 'react-router-dom';

const ArticlesHome = () => {
  const { tabName } = useParams();
  const tag: string = useOutletContext();
  const { offset, setOffset, range, setRange } = useArticleTabData(tabName, tag);
  const globalArticles = useAppSelector(articlesStateSelector);
  const feedArticles = useAppSelector(articlesFeedStateSelector);
  const tagArticles = useAppSelector(articlesTagStateSelector);
  const isLoading = useAppSelector(loadingArticlesStateSelector);

  const currentArticles =
    tabName === 'global' ? globalArticles : tabName === 'feed' ? feedArticles : tagArticles;
  return (
    <Box height="100%">
      <ArticleList articles={currentArticles?.articles} isLoaded={!isLoading} />
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
    </Box>
  );
};

export default ArticlesHome;

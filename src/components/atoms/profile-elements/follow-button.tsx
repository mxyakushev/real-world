import { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useAppSelector, useHandleFollow } from 'hooks';
import { profileLoadingStateSelector, profileStateSelector } from 'app';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';

interface IProps {
  username: string;
  width?: boolean;
}
export const FollowButton: FC<IProps> = ({ username, width }) => {
  const profile = useAppSelector(profileStateSelector);
  const profileLoading = useAppSelector(profileLoadingStateSelector);
  const isFollowing = profile?.profile.following;
  const { handleFollowClick, disabledBtn } = useHandleFollow(username, isFollowing);

  if (profileLoading) {
    return <Button disabled>Loading</Button>;
  }

  return (
    <Button onClick={handleFollowClick} mb={2} disabled={disabledBtn} width={width ? '100%' : ''}>
      {isFollowing ? <RiUserUnfollowLine size={22} /> : <RiUserFollowLine size={22} />}
      <Box ml={1}>{isFollowing ? 'Followed' : 'Follow'}</Box>
    </Button>
  );
};

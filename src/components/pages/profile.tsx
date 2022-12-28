import React, { useEffect } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useAuth } from 'hooks';
import { getProfile, profileLoadingStateSelector, profileStateSelector } from 'app';
import { Avatar, Box, Heading, Spinner, Button } from '@chakra-ui/react';
import { FollowButton } from '../atoms';

const Profile = () => {
  const { username } = useParams();
  const user = useAuth();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(profileStateSelector);
  const profileLoading = useAppSelector(profileLoadingStateSelector);

  useEffect(() => {
    if (username) {
      dispatch(getProfile(username));
    }
  }, [dispatch, username]);

  if (profileLoading) {
    return (
      <Box display="flex" h="90vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box py={5}>
      <Box p={5} mx="auto" maxWidth="500px">
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <Avatar mr={2} boxSize={140} src={profile?.profile.image} />
          <Box>
            <Heading mb={3}>{profile?.profile.username}</Heading>
            {profile?.profile && profile.profile.username !== user?.user.username && (
              <FollowButton username={profile.profile.username} />
            )}
            {profile?.profile.bio && <Box textAlign="center">{profile?.profile.bio}</Box>}
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Link to={`/profile/${username}/articles`}>
            <Button mr={2}>Profile articles</Button>
          </Link>
          <Link to={`/profile/${username}/favorited`}>
            <Button ml={2}>Favorited articles</Button>
          </Link>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Profile;

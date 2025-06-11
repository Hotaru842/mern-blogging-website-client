import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/loader.component';
import AboutUser from '../components/about.component';

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: ""
  },
  account_info: {
    total_posts: 0,
    total_reads: 0,
  },
  social_links: {},
  joinedAt: ""
}

const ProfilePage = () => {
  let { id: profileId } = useParams();
  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const { userAuth: { username }} = useContext(UserContext)

  const { personal_info: { fullname, username: profile_username, profile_img, bio },
  account_info: {total_posts, total_reads}, social_links, joinedAt} = profile;

  const fetchUserProfile = () => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", { username: profileId })
    .then(({ data: user }) => {
      setProfile(user);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    })
  }

  useEffect(() => {
    resetStates();
    fetchUserProfile();
  }, [profileId]);

  const resetStates = () => {
    setProfile(profileDataStructure);
    setLoading(true);
  }

  return (
    <AnimationWrapper>
      {
        loading ? <Loader /> :
        <section className="flex-row-reverse items-start h-cover md:flex gap-5 min-[1100px]:gap-12">
          <div className="flex flex-col gap-5 max-md:items-center min-w-[250px]">
            <img src={profile_img} alt={profile_username} className="w-48 h-48 rounded-full bg-grey md:w-32 md:h-32" />
            <h1 className="!text-2xl font-medium">@{profile_username}</h1>
            <p className="h-6 !text-xl capitalize">{fullname}</p>
            <p>{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads</p>
            <div className="flex gap-4 mt-2">
              {
                profileId == username ?
                <Link to="/settings/edit-profile" className="rounded-md btn-light">Edit profile</Link> :
                null
              }
            </div>
            <AboutUser bio={bio} social_links={social_links} 
            joinedAt={joinedAt} className="max-md:hidden" />
          </div>
        </section>
      }
    </AnimationWrapper>
  )
}

export default ProfilePage;
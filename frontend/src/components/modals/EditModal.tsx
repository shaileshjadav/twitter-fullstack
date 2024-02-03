import useEditModal from "../../hooks/useEditModal";

import { useCallback, useEffect, useState } from "react";

import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const EditModal = () => {
  const { user: currentUser } = useAuth();
  const { data: currentUserData } = useUser(currentUser?.id);
  const { updateProfile, isLoading, isSuccess } = useUpdateProfile(
    currentUser?.id
  );
  const editModal = useEditModal();
  const { onClose } = editModal;
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setProfileImage(currentUserData?.profileImage);
    setCoverImage(currentUserData?.coverImage);
    setBio(currentUserData?.bio);
    setName(currentUserData?.name);
    setUsername(currentUserData?.username);
  }, [
    currentUserData?.profileImage,
    currentUserData?.coverImage,
    currentUserData?.bio,
    currentUserData?.name,
    currentUserData?.username,
  ]);

  const onSubmit = useCallback(async () => {
    updateProfile({
      username,
      name,
      bio,
      profileImage,
      coverImage,
    });
  }, [updateProfile, username, name, bio, profileImage, coverImage]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />

      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />

      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />

      <Input
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};
export default EditModal;

import useEditModal from "../../hooks/useEditModal";

import { useCallback, useEffect, useState } from "react";

import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import useAwsUpload from "../../hooks/useAwsUpload";

const EditModal = () => {
  const { user: currentUser } = useAuth();
  const { data: currentUserData } = useUser(currentUser?.id);
  const { updateProfile, isLoading, isSuccess } = useUpdateProfile(
    currentUser?.id
  );
  const { uploadObject, generatePresignedUrl } = useAwsUpload();
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
    let profileImageKeyPath = currentUserData?.profileImage || null;

    if (profileImage && currentUserData?.profileImage !== profileImage) {
      const { presigneUrl, filePath } = await generatePresignedUrl(
        `auth/presignedurlForProfile`
      );
      await uploadObject(presigneUrl, profileImage);
      profileImageKeyPath = filePath;
    }

    let coverImageKeyPath = currentUserData?.coverImage || null;
    if (coverImage && currentUserData.coverImage !== coverImage) {
      const {
        presigneUrl: presigneUrlForCoverImage,
        filePath: coverImagefilePath,
      } = await generatePresignedUrl(`auth/presignedurlForCoverImage`);
      await uploadObject(presigneUrlForCoverImage, coverImage);
      coverImageKeyPath = coverImagefilePath;
    }

    updateProfile({
      username,
      name,
      bio,
      profileImage: profileImageKeyPath,
      coverImage: coverImageKeyPath,
    });
  }, [
    currentUserData?.profileImage,
    currentUserData.coverImage,
    profileImage,
    coverImage,
    updateProfile,
    username,
    name,
    bio,
    generatePresignedUrl,
    uploadObject,
  ]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={currentUserData.profileImageUrl || profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />

      <ImageUpload
        value={currentUserData.coverImageUrl || coverImage}
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

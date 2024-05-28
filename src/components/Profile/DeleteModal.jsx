import { useState, useEffect } from "react";
import UniversalModal from "../Modals/UniversalModal";
import { deleteExperience } from "../../helpers/APIs/freelancerApis";
import { Button } from "@chakra-ui/react";
import { getAllDetailsOfUser } from "../../helpers/APIs/userApis";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "../../redux/authSlice/profileSlice";
import BtnSpinner from "../Skeletons/BtnSpinner";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: " 0",
    borderRadius: "12px",
  },
};

function AlertDeleteDialog({ id, modalIsOpen = true, setModalIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState();
  const dispatch = useDispatch();
  const existProfile = useSelector((state) => state?.profile?.profile);

  const closeModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  const newProfile = (id) => {
    const profile = {
      ...existProfile,
      experience: existProfile.experience.filter((item) => item._id !== id),
    };
    dispatch(profileData({ profile: profile }));
  };

  const getUpdatedUser = async () => {
    const resp = await getAllDetailsOfUser();

    dispatch(profileData({ profile: resp?.body }));
  };

  useEffect(() => {
    let newPayload;
    if (id.type === "education") {
      newPayload = { education: { educationId: id.id } };
    } else if (id.type === "experience") {
      newPayload = { experienceId: id.id };
    }

    // Only update the state if the payload is different
    if (JSON.stringify(newPayload) !== JSON.stringify(payload)) {
      setPayload(newPayload);
    }
  }, [id]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteExperience(payload);
      newProfile(id.id);
    } catch (error) {
      console.error(error);
    }
    setModalIsOpen(false);
    setIsLoading(true);
  };

  return (
    <UniversalModal
      isModal={modalIsOpen}
      setIsModal={setModalIsOpen}
      title={id.type}
    >
      <div>
        <div>
          <div className="mt-3 text-lg">Do you want to delete this?</div>
          <div className="flex items-center justify-end gap-5 w-full border-t-[#F3F4F6] mt-5">
            <Button
              variant={"outline"}
              colorScheme="primary"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              loadingText="Confirm"
              colorScheme="primary"
              spinner={<BtnSpinner />}
              onClick={handleDelete}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </UniversalModal>
  );
}

export default AlertDeleteDialog;

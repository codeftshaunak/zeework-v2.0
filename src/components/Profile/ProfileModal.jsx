import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  HStack,
  useToast,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  updateFreelancerProfile,
  updateFreelancer,
  uploadImage,
  getAllDetailsOfUser,
} from "../../helpers/APIs/userApis.js";
import { getSkills } from "../../helpers/APIs/freelancerApis.js";
import { IoMdCheckmarkCircleOutline, IoMdClose } from "react-icons/io";
import { profileData } from "../../redux/authSlice/profileSlice.js";
import UniversalModal from "../Modals/UniversalModal.jsx";
import BtnSpinner from "../Skeletons/BtnSpinner.jsx";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import QuillToolbar, {
//   formats,
//   modules,
// } from "../Global/QuillToolbar/QuillToolbar.jsx";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/image/getCroppedImg.js";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { TiArrowBack, TiMinus, TiPlus, TiZoom } from "react-icons/ti";
import { BiSolidCrop } from "react-icons/bi";

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
    overflow: "visible",
    backgroundColor: "white",
  },
};

export const ProfileModal = ({
  modalIsOpen,
  closeModal,
  modalPage,
  storedData,
  inputChange,
  setModalIsOpen,
}) => {
  const userProfileInfo = useSelector((state) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const selectStyle = {
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#22C35E",
      color: "#fff",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#fff",
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#22C35E" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #22C35E" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#22C35E" : provided.borderColor,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#d1f3dd" : null,
      ":hover": {
        ...provided[":hover"],
        backgroundColor: "#d1f3dd", // Change to your desired hover background color
        color: "colorForTextOnGreen", // Change text color for better visibility if needed
      },
    }),
    // Add any other style customizations here
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  // include drag and drop with photo cropping features
  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullImage, setFullImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);

  // handle photo drag 'n' drop with photo cropping
  const onDrop = useCallback((acceptedFiles) => {
    setFullImage(acceptedFiles);
    setFileName(acceptedFiles[0].name);
    setErrorMessage("");

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) {
        setErrorMessage("Please select and crop an image before uploading.");
        return;
      }

      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([croppedImage], fileName, { type: "image/jpeg" });
      setCroppedImage([file]);
      setIsCropped(true);
      // await uploadProfileImage(file);
    } catch (e) {
      console.error(e);
      setErrorMessage("An error occurred while cropping the image.");
    }
  };

  const handleRevert = () => {
    setIsCropped(false);
  };

  const uploadProfileImage = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", isCropped ? croppedImage[0] : fullImage[0]);

      const { code, body } = await uploadImage(formData);

      if (code === 200) {
        dispatch(
          profileData({
            profile: body,
          })
        );
        closeModal();
        setImageSrc(null);
        setFileName("");
        setCroppedImage(null);
        setFullImage(null);
        setIsCropped(false);
      } else {
        setErrorMessage("An error occurred while uploading the image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("An error occurred while uploading the image.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (modalPage === "Update profile photo") {
      setImageSrc(null);
      setFileName("");
    }
  }, [modalIsOpen]);

  const [experienceInput, setExperienceInput] = useState({
    company_name: "",
    position: "",
    start_date: "",
    end_date: "",
    job_description: "",
    job_location: "",
  });
  const [educationInput, setEducationInput] = useState({
    degree_name: "",
    institution: "",
    start_date: "",
    end_date: "",
  });

  // const [updateEducationInput, setUpdateEducationInput] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    inputChange((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const [portfolioInput, setPortfolioInput] = useState({
    project_name: "",
    project_description: "",
    technologies: "",
  });

  const getUpdatedUser = async () => {
    const resp = await getAllDetailsOfUser();
    dispatch(profileData({ profile: resp?.body }));
  };

  // Handle Updating Skills Methods
  const getCategorySkills = async (categoryIds) => {
    try {
      if (!categoryIds) {
        console.error("No category IDs provided.");
        return;
      }

      const validCategoryIds = categoryIds.filter((category) => category._id);
      const promises = validCategoryIds.map(async ({ _id }) => {
        try {
          const { body, code } = await getSkills(_id);
          if (code === 200) {
            return body?.map((item) => ({
              value: item?.skill_name,
              label: item?.skill_name,
              _id: item?._id,
            }));
          } else {
            return [];
          }
        } catch (error) {
          console.error(`Error fetching skills for category ID ${_id}:`, error);
          return [];
        }
      });

      const results = await Promise.all(promises);
      const newSkillOptions = results.flat();

      setOptions(newSkillOptions);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    if (modalPage === "skills") {
      setSelectedOptions(
        userProfileInfo?.skills?.map((item) => ({
          value: item,
          label: item,
        }))
      );
    } else if (modalPage === "Basic Information") {
      setDescription(storedData?.description);
    }
    if (userProfileInfo?.categories)
      getCategorySkills(userProfileInfo.categories);
  }, [modalPage, userProfileInfo]);

  const handleSaveAndContinue = async (e, data) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      if (data === "category") {
        // Handle saving categories
        const selectedCategories = selectedOptions?.map(
          (option) => option.value
        );
        const response = await updateFreelancerProfile({
          categories: selectedCategories,
        });
        dispatch(
          profileData({
            profile: response?.body,
          })
        );
        if (response.code === 405) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          closeModal();
          setSelectedOptions([]);
        } else if (response.code === 200) {
          toast({
            title: "Category Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          closeModal();
          setSelectedOptions([]);
        }
      } else if (data == "skills") {
        const selectedCategories = selectedOptions.map(
          (option) => option?.value
        );

        const response = await updateFreelancerProfile({
          skills: selectedCategories,
        });
        dispatch(
          profileData({
            profile: response?.body,
          })
        );
        if (response.code == 405) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          closeModal();
          setSelectedOptions([]);
        } else if (response.code === 200) {
          toast({
            title: "Skills Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setSelectedOptions([]);
          closeModal();
        }
      } else if (data == "Add new project") {
        const formData = new FormData();
        if (selectedOptions.length < 5) {
          setIsLoading(false);
          return toast({
            title: "You have to add minimum five technologies",
            position: "top",
            colorScheme: "yellow",
            isClosable: "true",
          });
        }
        if (selectedImages.length <= 0) {
          setIsLoading(false);
          return toast({
            title: "You can't add portfolio without project images",
            position: "top",
            colorScheme: "yellow",
            isClosable: "true",
          });
        }
        for (let i = 0; i < selectedImages.length; i++) {
          const file = selectedImages[i];
          if (file) {
            formData.append(`file`, file, file.name);
          }
        }

        for (let i = 0; i < selectedOptions?.length; i++) {
          formData.append("portfolio[technologies]", selectedOptions[i]?.value);
        }

        formData.append("portfolio[project_name]", portfolioInput.project_name);
        formData.append(
          "portfolio[project_description]",
          portfolioInput.project_description
        );

        const response = await updateFreelancerProfile(formData);
        dispatch(
          profileData({
            profile: response?.body,
          })
        );
        setSelectedImages([]);
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setPortfolioInput({
            project_name: "",
            project_description: "",
            technologies: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Portfolio Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setPortfolioInput({
            project_name: "",
            project_description: "",
            technologies: "",
          });
          closeModal();
        }
      } else if (data == "experience") {
        const response = await updateFreelancerProfile({
          experience: {
            company_name: experienceInput.company_name,
            job_description: experienceInput.job_description,
            start_date: experienceInput.start_date,
            end_date: experienceInput.end_date,
            job_location: experienceInput.job_location,
            position: experienceInput.position,
          },
        });
        dispatch(
          profileData({
            profile: response?.body,
          })
        );
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setExperienceInput({
            company_name: "",
            job_description: "",
            start_date: "",
            end_date: "",
            job_location: "",
            position: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Exprience Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setExperienceInput({
            company_name: "",
            job_description: "",
            start_date: "",
            end_date: "",
            job_location: "",
            position: "",
          });
          closeModal();
        }
      } else if (data == "experienceUpdated") {
        inputChange({
          _id: storedData._id,
          company_name: storedData.company_name,
          job_description: storedData.job_description,
          start_date: storedData.start_date,
          end_date: storedData.end_date,
          job_location: storedData.job_location,
          position: storedData.position,
        });
        const response = await updateFreelancer({
          experience: {
            experienceId: storedData?._id,
            company_name: storedData?.company_name,
            job_description: storedData?.job_description,
            start_date: storedData?.start_date,
            end_date: storedData?.end_date,
            job_location: storedData.job_location,
            position: storedData.position,
          },
        });
        getUpdatedUser();
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            company_name: "",
            job_description: "",
            start_date: "",
            end_date: "",
            job_location: "",
            position: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Education Update Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            company_name: "",
            job_description: "",
            start_date: "",
            end_date: "",
            job_location: "",
            position: "",
          });
          closeModal();
        }
      } else if (data == "Update profile photo") {
        await uploadProfileImage();
      } else if (data == "education") {
        const response = await updateFreelancerProfile({
          education: {
            degree_name: educationInput.degree_name,
            institution: educationInput.institution,
            start_date: educationInput.start_date,
            end_date: educationInput.end_date,
          },
        });
        dispatch(
          profileData({
            profile: response?.body,
          })
        );
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setEducationInput({
            degree_name: "",
            institution: "",
            start_date: "",
            end_date: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Education Added Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setEducationInput({
            degree_name: "",
            institution: "",
            start_date: "",
            end_date: "",
          });
          closeModal();
        }
      } else if (data == "educationUpdate") {
        inputChange({
          _id: storedData._id,
          degree_name: storedData.degree_name,
          institution: storedData.institution,
          start_date: storedData.start_date,
          end_date: storedData.end_date,
        });
        const response = await updateFreelancer({
          education: {
            educationId: storedData?._id,
            degree_name: storedData?.degree_name,
            institution: storedData?.institution,
            start_date: storedData?.start_date,
            end_date: storedData?.end_date,
          },
        });
        getUpdatedUser();
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            degree_name: "",
            institution: "",
            start_date: "",
            end_date: "",
          });
          closeModal();
        } else if (response.code === 200) {
          // Handle category added successfully
          toast({
            title: "Education Update Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            degree_name: "",
            institution: "",
            start_date: "",
            end_date: "",
          });
          closeModal();
        }
      } else if (data == "Basic Information") {
        inputChange({
          professional_role: storedData.professional_role,
          hourly_rate: storedData.hourly_rate,
          description: description,
        });
        const response = await updateFreelancer({
          professional_role: storedData?.professional_role,
          hourly_rate: storedData?.hourly_rate,
          description: description,
        });
        getUpdatedUser();
        if (response.code == 405 || response.code == 500) {
          toast({
            title: response.msg,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            professional_role: "",
            hourly_rate: "",
            description: "",
          });
          closeModal();
        } else if (response.code === 200) {
          toast({
            title: "Basic Info Updated Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          inputChange({
            professional_role: "",
            hourly_rate: "",
            description: "",
          });
          closeModal();
        }
      }

      // Close Modal
      closeModal();
      setModalIsOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      closeModal();
      setModalIsOpen(false);
      setIsLoading(false);
    }
  };

  // Handle Media Image Uploaded
  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = [...selectedImages];

    // Calculate the number of images already selected
    const totalImagesSelected = newImages.length;

    // Calculate the maximum number of images that can be added
    const maxImagesToAdd = Math.min(3 - totalImagesSelected, files.length);

    // Add new images up to the maximum limit
    for (let i = 0; i < maxImagesToAdd; i++) {
      newImages.push(files[i]);
    }

    // Update the state with the new images
    setSelectedImages(newImages);
  };

  const handleImageDelete = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(updatedImages);
  };

  return (
    <UniversalModal isModal={modalIsOpen} setIsModal={setModalIsOpen}>
      <div className="w-full flex flex-col gap-[20px]">
        <p className="text-[16px] capitalize text-[#374151] font-semibold">
          {modalPage}
        </p>

        <form onSubmit={(e) => handleSaveAndContinue(e, modalPage)}>
          {modalPage === "skills" && (
            <>
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={options}
                    value={selectedOptions}
                    onChange={handleChange}
                    styles={selectStyle}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-5 w-full border-t-[1px] border-t-[#F3F4F6] ">
                <Button
                  isLoading={isLoading}
                  loadingText="Updating"
                  colorScheme="primary"
                  type="submit"
                  fontSize={"0.9rem"}
                  spinner={<BtnSpinner />}
                >
                  Update
                </Button>
              </div>
            </>
          )}
          {modalPage === "Add new project" && (
            <>
              {" "}
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col  ">
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151] mb-2">
                      Project Name
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Project Name"
                        onChange={(e) =>
                          setPortfolioInput({
                            ...portfolioInput,
                            project_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <br />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151] mb-2">
                      Project Description
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <textarea
                        required
                        type="text"
                        onChange={(e) =>
                          setPortfolioInput({
                            ...portfolioInput,
                            project_description: e.target.value,
                          })
                        }
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Description"
                      />
                    </div>
                    <br />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151] mb-2">
                      Technologies
                    </p>
                    <div className="w-[100%] outline-none border-[1px] rounded-md">
                      {/* <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                    placeholder="Technologies"
                    onChange={(e) =>
                      setPortfolioInput({
                        ...portfolioInput,
                        technologies: e.target.value,
                      })
                    }
                  /> */}

                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={options}
                        onChange={handleChange}
                        required
                        styles={selectStyle}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[2px] mt-6">
                    <p className="text-[14px] font-[500] text-[#374151] mb-2">
                      Media
                    </p>
                    <div className="w-[100%] p-[12px] outline-none border-[1px] rounded-md flex">
                      <div className="flex">
                        {selectedImages?.map((image, index) => (
                          <div
                            key={index}
                            className="rounded border border-green-300 mr-2 relative"
                          >
                            <img
                              src={URL?.createObjectURL(image)}
                              alt={`Selected ${index + 1}`}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <span
                              className="h-5 w-5 bg-red-50/10 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                              onClick={() => handleImageDelete(index)}
                            >
                              <IoMdClose />
                            </span>
                          </div>
                        ))}
                      </div>

                      {selectedImages.length < 3 && (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            name="file"
                            multiple
                            style={{ display: "none" }}
                            id="fileInput"
                            disabled={selectedImages.length >= 3}
                          />
                          <label htmlFor="fileInput">
                            <div
                              className={`w-24 h-20 border border-green-400 rounded cursor-pointer bg-green-100 hover:bg-green-200 flex flex-col items-center justify-center text-center`}
                            >
                              <span>
                                <FaCloudUploadAlt className="text-2xl text-center" />
                              </span>
                              <span className="font-semibold">
                                {selectedImages?.length > 0
                                  ? "Add More"
                                  : "Add"}
                              </span>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-5 w-full border-t-[1px] border-t-[#F3F4F6] ">
                <Button
                  isLoading={isLoading}
                  loadingText="Adding Project"
                  colorScheme="primary"
                  type="submit"
                  fontSize={"0.9rem"}
                  spinner={<BtnSpinner />}
                >
                  Add Project
                </Button>
              </div>
            </>
          )}
          {modalPage === "education" && (
            <>
              {" "}
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col  ">
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Degree Name
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Degree"
                        required
                        onChange={(e) =>
                          setEducationInput({
                            ...educationInput,
                            degree_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <br />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Institution
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Institution"
                        required
                        onChange={(e) =>
                          setEducationInput({
                            ...educationInput,
                            institution: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <HStack justifyContent={"space-between"}>
                    <div className="flex flex-col gap-[2px] w-[49%]">
                      <p className="text-[14px] font-[500] text-[#374151]">
                        Start Date
                      </p>
                      <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                        <input
                          type="date"
                          className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                          placeholder="State date"
                          required
                          onChange={(e) =>
                            setEducationInput({
                              ...educationInput,
                              start_date: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <br />
                    <div className="flex flex-col gap-[2px] w-[49%]">
                      <p className="text-[14px] font-[500] text-[#374151]">
                        End Date
                      </p>
                      <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                        <input
                          type="date"
                          className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                          placeholder="End Date"
                          required
                          onChange={(e) =>
                            setEducationInput({
                              ...educationInput,
                              end_date: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </HStack>
                  <br />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-5 w-full border-t-[1px] border-t-[#F3F4F6] ">
                <Button
                  isLoading={isLoading}
                  loadingText="Adding"
                  colorScheme="primary"
                  type="submit"
                  fontSize={"0.9rem"}
                  spinner={<BtnSpinner />}
                >
                  Add
                </Button>
              </div>
            </>
          )}
          {modalPage === "Update Education" && storedData && (
            <>
              {" "}
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col  ">
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Degree Name
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Degree"
                        name="degree_name"
                        value={storedData.degree_name}
                        // defaultValue={updateEducationInput.degree_name}
                        onChange={handleInputChange}
                      />
                      <input
                        type="hidden"
                        name="_id"
                        value={storedData._id}
                        onChange={handleInputChange}
                      />
                    </div>
                    <br />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Institution
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Institution"
                        name="institution"
                        value={storedData.institution}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <br />
                  <HStack justifyContent={"space-between"}>
                    <div className="flex flex-col gap-[2px] w-[49%]">
                      <p className="text-[14px] font-[500] text-[#374151]">
                        Start Date
                      </p>
                      <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                        <input
                          required
                          type="date"
                          className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                          placeholder="Start date"
                          name="start_date"
                          value={storedData.start_date}
                          defaultValue={storedData.start_date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="flex flex-col gap-[2px] w-[49%]">
                      <p className="text-[14px] font-[500] text-[#374151]">
                        End Date
                      </p>
                      <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                        <input
                          required
                          type="date"
                          className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                          placeholder="End Date"
                          name="end_date"
                          value={storedData.end_date}
                          defaultValue={storedData.end_date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </HStack>
                  <br />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-5 w-full border-t-[1px] border-t-[#F3F4F6] ">
                <Button
                  isLoading={isLoading}
                  loadingText="Updating"
                  colorScheme="primary"
                  type="submit"
                  fontSize={"0.9rem"}
                  spinner={<BtnSpinner />}
                >
                  Update
                </Button>
              </div>
            </>
          )}
          {modalPage === "experience" && (
            <>
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Your Company Name
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Your Company Name"
                        onChange={(e) =>
                          setExperienceInput({
                            ...experienceInput,
                            company_name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <HStack justifyContent={"space-between"}>
                    <div className="flex flex-col gap-[2px] w-[49%]">
                      <p className="text-[14px] font-[500] text-[#374151]">
                        Start Year
                      </p>
                      <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                        <input
                          required
                          type="date"
                          className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                          placeholder="Institution"
                          onChange={(e) =>
                            setExperienceInput({
                              ...experienceInput,
                              start_date: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <br />
                    <div className="flex flex-col gap-[2px] w-[49%]">
                      <p className="text-[14px] font-[500] text-[#374151]">
                        End Year
                      </p>
                      <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                        <input
                          required
                          type="date"
                          className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                          placeholder="Position"
                          onChange={(e) =>
                            setExperienceInput({
                              ...experienceInput,
                              end_date: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </HStack>
                  <br />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Position
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Position"
                        onChange={(e) =>
                          setExperienceInput({
                            ...experienceInput,
                            position: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Location
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        value={experienceInput.job_location}
                        onChange={(e) =>
                          setExperienceInput({
                            ...experienceInput,
                            job_location: e.target.value,
                          })
                        }
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Description
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <textarea
                        required
                        type="text"
                        value={experienceInput.job_description}
                        onChange={(e) =>
                          setExperienceInput({
                            ...experienceInput,
                            job_description: e.target.value,
                          })
                        }
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-5 w-full border-t-[1px] border-t-[#F3F4F6] ">
                <Button
                  isLoading={isLoading}
                  loadingText="Adding"
                  colorScheme="primary"
                  type="submit"
                  fontSize={"0.9rem"}
                  spinner={<BtnSpinner />}
                >
                  Add
                </Button>
              </div>
            </>
          )}
          {modalPage === "experienceUpdated" && storedData && (
            <>
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Your Company Name
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Your Company Name"
                        name="company_name"
                        value={storedData?.company_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <br />
                  <HStack justifyContent={"space-between"}>
                    <div className="flex flex-col gap-[2px] w-[49%]">
                      <p className="text-[14px] font-[500] text-[#374151]">
                        Start Year
                      </p>
                      <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                        <input
                          required
                          type="date"
                          className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                          placeholder="Institution"
                          name="start_date"
                          value={storedData?.start_date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="flex flex-col gap-[2px] w-[49%]">
                      <p className="text-[14px] font-[500] text-[#374151]">
                        End Year
                      </p>
                      <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                        <input
                          required
                          type="date"
                          className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                          placeholder="Position"
                          name="end_date"
                          value={storedData?.end_date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </HStack>
                  <br />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Position
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="Position"
                        name="position"
                        value={storedData?.position}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Location
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        name="job_location"
                        value={storedData?.job_location}
                        onChange={handleInputChange}
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Description
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <textarea
                        required
                        type="text"
                        name="job_description"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        value={storedData?.job_description}
                        onChange={handleInputChange}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-5 w-full border-t-[1px] border-t-[#F3F4F6] ">
                <Button
                  isLoading={isLoading}
                  loadingText="Updating"
                  colorScheme="primary"
                  type="submit"
                  fontSize={"0.9rem"}
                  spinner={<BtnSpinner />}
                >
                  Update
                </Button>
              </div>
            </>
          )}
          {modalPage === "Update profile photo" && (
            <>
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-[2px]">
                    {!imageSrc && (
                      <div
                        {...getRootProps()}
                        className={`w-[100%] ${fileName ? "py-5" : "py-8"
                          } px-3 outline-none border-2 rounded-md border-dashed border-primary cursor-pointer bg-green-100 font-medium tracking-wide`}
                      >
                        {!fileName && (
                          <RiUploadCloud2Fill className="text-green-300 text-6xl mx-auto" />
                        )}
                        <input
                          {...getInputProps()}
                          className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)]"
                          placeholder="Select an image"
                          onChange={() => {
                            const file = getInputProps().files[0];
                            if (file) {
                              setFileName(file.name);
                            }
                            setErrorMessage("");
                          }}
                        />

                        {isDragActive ? (
                          <p className="text-center ">
                            Drop the files here ...{" "}
                          </p>
                        ) : (
                          <p className="text-center ">
                            Drag &apos;n&apos; drop image file here, or click to
                            select file
                          </p>
                        )}
                      </div>
                    )}
                    {fileName && (
                      <p className="text-center mt-2 -mb-4 text-green-600">
                        {fileName}
                      </p>
                    )}
                    {errorMessage && (
                      <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                  </div>
                </div>
                {imageSrc && (
                  <>
                    <div className="relative w-full h-64">
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        showGrid={false}
                        onCropChange={isCropped ? undefined : setCrop}
                        onZoomChange={isCropped ? undefined : setZoom}
                        onCropComplete={onCropComplete}
                        cropShape={"round"}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 w-full sm:w-96">
                        <TiMinus />
                        <Slider
                          aria-label="zoom-slider"
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          onChange={(val) => {
                            !isCropped && setZoom(val);
                          }}
                        >
                          <SliderTrack className="bg-slate-300">
                            <SliderFilledTrack bg={"slategrey"} />
                          </SliderTrack>
                          <SliderThumb boxSize={6}>
                            <Box className="text-slate-500" as={TiZoom} />
                          </SliderThumb>
                        </Slider>
                        <TiPlus />
                      </div>
                      <div className="flex items-center justify-center gap-5">
                        <button
                          type="button"
                          className={`flex items-center gap-1 ${!isCropped
                            ? "cursor-no-drop bg-slate-400"
                            : "bg-slate-500"
                            }   rounded py-1 px-3 text-white w-fit mt-2`}
                          onClick={handleRevert}
                          disabled={!isCropped}
                        >
                          <TiArrowBack /> Cancel
                        </button>
                        <button
                          type="button"
                          className={`flex items-center gap-1 ${isCropped
                            ? "cursor-no-drop bg-slate-400"
                            : "bg-slate-500"
                            }  rounded py-1 px-3 text-white w-fit mt-2`}
                          onClick={handleCrop}
                          disabled={isCropped}
                        >
                          {isCropped ? (
                            <>
                              <IoMdCheckmarkCircleOutline /> Cropped
                            </>
                          ) : (
                            <>
                              <BiSolidCrop /> Crop photo
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {imageSrc && (
                <div className="text-right mt-10">
                  <Button
                    isLoading={isLoading}
                    loadingText="Uploading"
                    colorScheme="primary"
                    onClick={() => uploadProfileImage()}
                    paddingX={7}
                    spinner={<BtnSpinner />}
                  >
                    Upload
                  </Button>
                </div>
              )}
            </>
          )}

          {modalPage === "Basic Information" && (
            <>
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Title
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="text"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="professional_role"
                        name="professional_role"
                        value={storedData?.professional_role}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Hourly
                    </p>
                    <div className="w-[100%]  py-[2px] px-[12px] outline-none border-[1px] rounded-md">
                      <input
                        required
                        type="number"
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        placeholder="hourly_rate"
                        name="hourly_rate"
                        value={storedData?.hourly_rate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[14px] font-[500] text-[#374151]">
                      Description
                    </p>
                    <div className="w-[100%]">
                      {/* <QuillToolbar />
                      <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        className="h-36 [&>*]:rounded-b-md"
                        modules={modules}
                        formats={formats}
                      /> */}
                      {/* <textarea
                        required
                        type="text"
                        name="description"
                        className="w-full h-24 py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] "
                        value={storedData?.description}
                        onChange={handleInputChange}
                        placeholder="description"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-5 w-full">
                <Button
                  isLoading={isLoading}
                  loadingText="Updating"
                  colorScheme="primary"
                  type="submit"
                  fontSize={"0.9rem"}
                  spinner={<BtnSpinner />}
                >
                  Update Info
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </UniversalModal>
  );
};

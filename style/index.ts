const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2: "text-red-600 text-lg font-bold text-left sm:pb-6 pb-2",
  paragraph:
    "font-poppins font-normal text-sm text-black text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",

  formAuthButton:"font-sm text-[18px] text-primary bg-slate-400 hover:bg-orange-700 rounded-[10px] outline-none",
  formLabelStyles: "block text-gray-700 text-sm font-bold mb-2",
  formErrorStyles: "text-red-400 text-xs italic",
  formInputStyles: "bg-slate-100",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;

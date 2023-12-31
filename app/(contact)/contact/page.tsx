import AdminButtons from "@/components/ui/AdminButtons";
import LargeHeading from "@/components/ui/LargeHeading";

import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="relative flex items-center justify-center">
      <div className="sm:py-16 py-6 w-full">
        <div className="container max-w-7xl mx-auto">
          <LargeHeading>Contact Us</LargeHeading>

          <div className="flex gap-6 md:flex-row flex-col transition-all ease-in-out">
            <div className="w-full flex items-center justify-center">
              <div className="self-start">
                <p className="text-base text-dimPurple font-bold text-left sm:pb-4 pb-2 ">
                  We&apos;d love to hear from you
                </p>
                <p className="max-w-xl font-normal text-lg">
                  We value your feedback, inquiries, and any other communication
                  you may have. Our dedicated team is ready to assist you with
                  any questions or concerns you might have regarding our
                  services, appointments, or general automotive needs. Feel free
                  to reach out to us using the contact information provided
                  below. We&apos;re available during business hours to provide
                  prompt and helpful responses. You can also use the chat widget
                  on our website to send us a message directly and get instant
                  response.
                </p>
                <AdminButtons />
              </div>
            </div>

            <div className="w-full flex items-center justify-center">
              <div className="rounded-lg overflow-hidden max-w-lg ">
                <svg width="300" height="300" viewBox="0 0 547 419" fill="none">
                  <path
                    d="M260.524 0C153.605 0 65.3125 80.3748 52.8548 183.99L0 209.289L52.8548 234.588C65.3125 338.325 153.605 418.578 260.524 418.578C376.031 418.578 469.766 324.888 469.766 209.168C469.766 93.4478 376.152 0 260.524 0Z"
                    fill="#DFE3FF"
                  ></path>
                  <mask
                    id="mask0"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="470"
                    height="419"
                  >
                    <path
                      d="M260.524 0C153.605 0 65.3125 80.3748 52.8548 183.99L0 209.289L52.8548 234.588C65.3125 338.325 153.605 418.578 260.524 418.578C376.031 418.578 469.766 324.888 469.766 209.168C469.766 93.4478 376.152 0 260.524 0Z"
                      fill="#EFF1FF"
                    ></path>
                  </mask>
                  <g mask="url(#mask0)">
                    <path
                      d="M253.521 326.231C173.45 326.231 104.58 372.894 74 440.911H433C402.42 372.894 333.55 326.231 253.521 326.231Z"
                      fill="#3D0077"
                    ></path>
                    <path
                      d="M234.186 265.743L226.477 332.526C226.477 332.526 256.29 411.986 300.883 332.526L292.109 265.743H234.186Z"
                      fill="#A476D4"
                    ></path>
                    <path
                      d="M289.64 255.534C292.451 262.213 293.133 275.91 294.198 282.248C294.198 282.248 262.595 284.374 255.567 274.166C252.756 269.954 252.075 263.957 254.162 259.065C260.167 248.133 284.742 243.922 289.64 255.534Z"
                      fill="#511B7C"
                    ></path>
                    <path
                      d="M312.086 136.345C309.615 111.716 289.257 92.0642 264 92.0642C238.744 92.0642 218.002 111.419 215.915 136.345H215.574V222.143H215.915C215.915 223.206 215.574 224.61 215.574 225.673C215.574 252.727 237.338 274.548 264.341 274.548C291.386 274.548 313.108 252.769 313.108 225.673C313.108 224.27 312.767 223.206 312.767 222.143H313.108V136.345H312.086Z"
                      fill="#A476D4"
                    ></path>
                    <path
                      d="M220.515 167.993C220.174 162.378 215.617 158.167 209.995 158.167C204.373 158.167 199.815 162.378 199.475 167.993V186.965C199.475 187.305 199.475 187.305 199.475 187.688C199.475 193.685 204.373 198.577 210.335 198.577C216.298 198.577 221.196 193.643 221.196 187.688C221.196 187.347 221.196 186.965 221.196 186.965L220.515 167.993Z"
                      fill="#A476D4"
                    ></path>
                    <path
                      d="M329.292 167.993C328.951 162.378 324.394 158.167 318.772 158.167C313.15 158.167 308.593 162.378 308.252 167.993V186.965C308.252 187.305 308.252 187.305 308.252 187.688C308.252 193.685 313.15 198.577 319.113 198.577C325.075 198.577 329.973 193.643 329.973 187.688C329.973 187.347 329.973 186.965 329.973 186.965L329.292 167.993Z"
                      fill="#A476D4"
                    ></path>
                    <path
                      d="M264 187.305C263.404 187.305 262.936 186.837 262.936 186.242V154.254C262.936 153.658 263.404 153.19 264 153.19C264.597 153.19 265.065 153.658 265.065 154.254V186.242C265.065 186.837 264.597 187.305 264 187.305Z"
                      fill="#3D0077"
                    ></path>
                    <path
                      d="M275.967 163.782C274.775 163.782 273.838 162.847 273.838 161.656V159.188C273.838 158.04 274.775 157.062 275.967 157.062C277.16 157.062 278.097 157.997 278.097 159.188V161.656C278.097 162.847 277.117 163.782 275.967 163.782Z"
                      fill="#3D0077"
                    ></path>
                    <path
                      d="M251.733 163.782C250.541 163.782 249.604 162.847 249.604 161.656V159.188C249.604 158.04 250.541 157.062 251.733 157.062C252.926 157.062 253.863 157.997 253.863 159.188V161.656C253.863 162.847 252.926 163.782 251.733 163.782Z"
                      fill="#3D0077"
                    ></path>
                    <path
                      d="M267.875 66.7124C257.355 54.7595 244.365 48.8043 238.402 53.7386C233.504 57.6095 234.526 67.0953 239.808 77.6445C236.656 76.581 233.504 75.5176 229.969 74.837C214.509 71.6893 200.837 75.1773 199.431 82.5788C198.367 88.1937 204.329 94.1914 213.827 98.0623C213.486 98.0623 213.146 98.4026 213.146 98.4026C190.7 107.208 174.558 120.564 177.327 127.923C180.138 135.325 200.837 133.921 223.666 125.116C235.932 120.182 246.111 114.226 252.457 108.611C249.306 114.226 248.241 119.501 251.052 121.968C254.928 125.839 264.042 122.308 271.751 114.567C276.308 110.015 279.119 105.081 280.184 100.87C282.995 101.21 285.082 101.593 286.488 101.593C294.921 102.656 300.883 110.398 300.883 110.398C298.072 93.4683 276.308 73.7736 267.875 66.7124Z"
                      fill="#461071"
                    ></path>
                    <g opacity="0.45">
                      <path
                        opacity="0.45"
                        d="M300.543 111.036H278.438C277.842 111.036 277.373 110.568 277.373 109.972C277.373 109.377 277.842 108.909 278.438 108.909H300.543C301.139 108.909 301.607 109.377 301.607 109.972C301.607 110.568 301.096 111.036 300.543 111.036Z"
                        fill="#3D0077"
                      ></path>
                    </g>
                    <g opacity="0.45">
                      <path
                        opacity="0.45"
                        d="M304.376 116.311H285.764C285.168 116.311 284.699 115.843 284.699 115.247C284.699 114.652 285.168 114.184 285.764 114.184H304.376C304.973 114.184 305.441 114.652 305.441 115.247C305.441 115.843 304.973 116.311 304.376 116.311Z"
                        fill="#3D0077"
                      ></path>
                    </g>
                    <g opacity="0.45">
                      <path
                        opacity="0.45"
                        d="M307.187 121.585H292.11C291.513 121.585 291.045 121.117 291.045 120.522C291.045 119.926 291.513 119.458 292.11 119.458H307.187C307.783 119.458 308.252 119.926 308.252 120.522C308.252 121.117 307.783 121.585 307.187 121.585Z"
                        fill="#3D0077"
                      ></path>
                    </g>
                    <g opacity="0.45">
                      <path
                        opacity="0.45"
                        d="M309.657 126.86H302.629C302.033 126.86 301.564 126.392 301.564 125.797C301.564 125.201 302.033 124.733 302.629 124.733H309.657C310.253 124.733 310.722 125.201 310.722 125.797C310.722 126.392 310.253 126.86 309.657 126.86Z"
                        fill="#3D0077"
                      ></path>
                    </g>
                    <path
                      d="M328.551 201.46H312.344V156.915H328.551C336.292 156.915 342.581 163.209 342.581 170.956V187.54C342.581 195.166 336.292 201.46 328.551 201.46Z"
                      fill="#5F36A8"
                    ></path>
                    <path
                      d="M287.184 231.564H269.042C268.558 231.564 268.074 231.08 268.074 230.595C268.074 230.111 268.558 229.627 269.042 229.627H278.113H287.184C301.214 229.627 312.583 208.249 312.583 194.207V184.039C312.583 183.555 313.067 183.071 313.551 183.071C314.035 183.071 314.519 183.555 314.519 184.039V194.207C314.519 209.338 302.303 231.564 287.184 231.564Z"
                      fill="#5F36A8"
                    ></path>
                    <path
                      d="M267.835 239.398H253.564C250.54 239.398 248 236.977 248 233.83V227.293C248 224.267 250.419 221.725 253.564 221.725H267.835C270.859 221.725 273.399 224.146 273.399 227.293V233.83C273.278 236.856 270.859 239.398 267.835 239.398Z"
                      fill="#5F36A8"
                    ></path>
                    <path
                      d="M319.603 156.915H317.668V201.46H319.603V156.915Z"
                      fill="#9C7ACD"
                    ></path>
                  </g>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M339.203 52.312C335.889 52.312 333.203 54.9983 333.203 58.312V133.878C333.203 137.191 335.889 139.878 339.203 139.878H397.187C397.499 150.173 388.454 157.033 383.789 159.211C397.817 159.211 409.757 148.77 416.869 139.878H540.999C544.313 139.878 546.999 137.191 546.999 133.877V58.312C546.999 54.9983 544.313 52.312 540.999 52.312H339.203Z"
                    fill="#1DCBEF"
                  ></path>
                  <path
                    d="M418.297 81.3679H424.921V107H418.297V96.6319H407.929V107H401.305V81.3679H407.929V91.3399H418.297V81.3679Z"
                    fill="white"
                  ></path>
                  <path
                    d="M446.059 98.5039H434.575C434.695 99.9199 435.103 100.94 435.799 101.564C436.495 102.188 437.515 102.5 438.859 102.5C439.771 102.5 440.683 102.356 441.595 102.068C442.507 101.756 443.335 101.336 444.079 100.808L445.735 105.128C444.823 105.8 443.719 106.328 442.423 106.712C441.127 107.096 439.831 107.288 438.535 107.288C436.447 107.288 434.635 106.904 433.099 106.136C431.563 105.368 430.387 104.276 429.571 102.86C428.755 101.42 428.347 99.7279 428.347 97.7839C428.347 95.9359 428.731 94.2919 429.499 92.8519C430.291 91.3879 431.371 90.2479 432.739 89.4319C434.131 88.6159 435.715 88.2079 437.491 88.2079C439.219 88.2079 440.731 88.5919 442.027 89.3599C443.323 90.1279 444.319 91.2319 445.015 92.6719C445.711 94.0879 446.059 95.7439 446.059 97.6399V98.5039ZM437.671 92.6719C436.063 92.6719 435.055 93.6079 434.647 95.4799H440.479C440.239 93.6079 439.303 92.6719 437.671 92.6719Z"
                    fill="white"
                  ></path>
                  <path
                    d="M449.074 107V80.5039H455.59V107H449.074Z"
                    fill="white"
                  ></path>
                  <path
                    d="M459.48 107V80.5039H465.996V107H459.48Z"
                    fill="white"
                  ></path>
                  <path
                    d="M479.102 107.288C477.062 107.288 475.286 106.904 473.774 106.136C472.262 105.368 471.098 104.264 470.282 102.824C469.466 101.384 469.058 99.6919 469.058 97.7479C469.058 95.8039 469.466 94.1119 470.282 92.6719C471.098 91.2319 472.262 90.1279 473.774 89.3599C475.286 88.5919 477.062 88.2079 479.102 88.2079C481.118 88.2079 482.87 88.6039 484.358 89.3959C485.87 90.1639 487.034 91.2679 487.85 92.7079C488.666 94.1239 489.074 95.8039 489.074 97.7479C489.074 99.6919 488.666 101.384 487.85 102.824C487.034 104.24 485.87 105.344 484.358 106.136C482.87 106.904 481.118 107.288 479.102 107.288ZM479.102 102.428C481.454 102.428 482.63 100.868 482.63 97.7479C482.63 96.1639 482.33 94.9999 481.73 94.2559C481.154 93.4879 480.278 93.1039 479.102 93.1039C477.902 93.1039 477.002 93.4879 476.402 94.2559C475.802 94.9999 475.502 96.1639 475.502 97.7479C475.502 99.3559 475.802 100.544 476.402 101.312C477.002 102.056 477.902 102.428 479.102 102.428Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;

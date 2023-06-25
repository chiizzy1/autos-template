import { BsTelephoneFill } from "react-icons/bs";

const BookingSideBar = () => (
  <div className="rounded-lg p-6 bg-white">
    <h4 className="font-medium text-lg"> Have a question?</h4>
    <p>Give us a call, we&apos;re here to help you.</p>
    <div className="flex items-center ">
      <BsTelephoneFill /> <span className="ml-2">012-345-678-9</span>
    </div>
    <hr className="my-8" />

    <h4 className="font-medium text-lg">Our Location?</h4>
    <p className="text-sm">plot 4-6, lekki ikate, lagos state, Nigeria</p>

    <hr className="my-8" />

    <h4 className="font-medium text-lg"> Opening Hours</h4>

    <table className="">
      {/* <tr className=''>
              <th>Days</th>
              <th>Opening Time</th>
            </tr> */}
      <tr className="text-sm">
        <td>
          <span className="">Sunday</span>
        </td>
        <td>
          <span className="pl-12">Closed</span>
        </td>
      </tr>
      <tr className="text-sm">
        <td>
          <span className="">Monday</span>
        </td>
        <td>
          <span className="pl-12">09:00am - 05:00pm</span>
        </td>
      </tr>
      <tr className="text-sm">
        <td>
          <span className="">Tuesday</span>
        </td>
        <td>
          <span className="pl-12">09:00am - 05:00pm</span>
        </td>
      </tr>
      <tr className="text-sm">
        <td>
          <span className="">Wednesday</span>
        </td>
        <td>
          <span className="pl-12">09:00am - 05:00pm</span>
        </td>
      </tr>
      <tr className="text-sm">
        <td>
          <span className="">Thursday</span>
        </td>
        <td>
          <span className="pl-12">09:00am - 05:00pm</span>
        </td>
      </tr>
      <tr className="text-sm">
        <td>
          <span className="">Friday</span>
        </td>
        <td>
          <span className="pl-12">09:00am - 05:00pm</span>
        </td>
      </tr>
      <tr className="text-sm">
        <td>
          <span className="">Saturday</span>
        </td>
        <td>
          <span className="pl-12">09:00am - 05:00pm</span>
        </td>
      </tr>
    </table>
  </div>
);
export default BookingSideBar
